import { HttpStatusCode } from 'axios';
import sharp from 'sharp';
import connectMongo from '@/lib/mongodb';
import IMedia from '@/models/media/media';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });

  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  try {
    await connectMongo();
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const isPublished = formData.get('isPublished') === 'true';
    const tagId = formData.get('tagId') as string;
    const type = formData.get('type') as string;
    const file = formData.get('file') as File;
    const srcVideo = formData.get('srcVideo') as string;

    if (!name || !description || !tagId || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    let mediaData: any = {
      name,
      description,
      isPublished,
      tagId,
      type,
      srcVideo,
    };

    if (file) {
      const fileBuffer = await file.arrayBuffer();

      const compressedBuffer = await sharp(Buffer.from(fileBuffer))
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();
      mediaData = {
        ...mediaData,
        data: compressedBuffer,
      };
    }

    const product = await IMedia.create(mediaData);

    return NextResponse.json(
      { product, message: 'Your media has been created' },
      { status: HttpStatusCode.Created },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.BadRequest },
    );
  }
}

export async function GET(req: NextRequest) {
  console.log(secret);
  const token = await getToken({ req, secret, raw: true });
  console.log(token);
  if (!token) {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  const { searchParams } = await req.nextUrl;
  const searchString = searchParams.get('searchString');
  const tagId = searchParams.get('tagId');
  const type = searchParams.get('type');
  const isPublished = searchParams.get('isPublished');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  try {
    await connectMongo();

    const media = await IMedia.aggregate([
      {
        $facet: {
          count: [
            {
              $match: {
                $or: [
                  {
                    name: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                  {
                    description: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                  {
                    filename: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                ],
                tagId: tagId === 'all' ? { $exists: true } : tagId,
                type: type === 'all' ? { $exists: true } : type,
                isPublished:
                  isPublished === 'all'
                    ? { $exists: true }
                    : isPublished === 'true'
                      ? true
                      : false,
              },
            },
            {
              $count: 'total',
            },
          ],
          data: [
            {
              $match: {
                $or: [
                  {
                    name: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                  {
                    description: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                  {
                    filename: {
                      $regex: searchString || '',
                      $options: 'i',
                    },
                  },
                ],
                type: type === 'all' ? { $exists: true } : type,
                tagId: tagId === 'all' ? { $exists: true } : tagId,
                isPublished:
                  isPublished === 'all'
                    ? { $exists: true }
                    : isPublished === 'true'
                      ? true
                      : false,
              },
            },
            {
              $skip: Number(limit) * (Number(page) - 1),
            },
            {
              $limit: Number(limit),
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ],
        },
      },
    ]);

    return NextResponse.json({
      total: media[0].count[0]?.total || 0,
      data: media[0].data || [],
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const id = formData.get('_id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const isPublished = formData.get('isPublished') === 'true';
    const tagId = formData.get('tagId') as string;
    const type = formData.get('type') as string;
    const file = formData.get('file') as File;
    const srcVideo = formData.get('srcVideo') as string;

    if (!id || !name || !description || !tagId || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    let mediaData: any = {
      name,
      description,
      isPublished,
      tagId,
      type,
      srcVideo,
    };

    if (file) {
      const fileBuffer = await file.arrayBuffer();

      const compressedBuffer = await sharp(Buffer.from(fileBuffer))
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();

      mediaData = {
        ...mediaData,
        data: compressedBuffer,
      };
    }

    const product = await IMedia.findByIdAndUpdate(id, mediaData, {
      new: true,
    });

    return NextResponse.json(
      { product, message: 'Your media has been updated' },
      { status: HttpStatusCode.Created },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.BadRequest },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = await req.nextUrl;

    if (!searchParams.get('id')) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    await IMedia.findByIdAndDelete(searchParams.get('id'));

    return NextResponse.json(
      { message: 'Your media has been deleted' },
      { status: HttpStatusCode.Created },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.BadRequest },
    );
  }
}
