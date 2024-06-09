import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req, secret, raw: true });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  try {
    await connectMongo();

    const db = mongoose.connection.db;

    const stats = await db.command({ dbStats: 1 });

    const collections = await db.listCollections().toArray();
    const collStats = await Promise.all(
      collections.map(async (collection) => {
        const stats = await db.command({ collStats: collection.name });
        return { name: collection.name, stats };
      }),
    );

    stats.collections = collStats;

    const bytesToKB = (bytes: number) => (bytes / 1024).toFixed(2);
    const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

    const convertedStats = {
      ...stats,
      storageSizeKB: bytesToKB(stats.storageSize),
      storageSizeMB: bytesToMB(stats.storageSize),
      indexSizeKB: bytesToKB(stats.indexSize),
      indexSizeMB: bytesToMB(stats.indexSize),
    };

    return NextResponse.json(convertedStats, { status: 200 });
  } catch (error) {
    console.error('Error fetching database stats:', error);
    return NextResponse.json(
      { message: 'Error fetching database stats' },
      { status: 500 },
    );
  }
}
