import connectMongo from '@/lib/mongodb';
import IProfile from '@/models/profile/profile';
import { HttpStatusCode } from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET() {
  try {
    await connectMongo();
    const profile = await IProfile.findOne().sort({ createdAt: -1 });
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  if (!token || token === 'null') {
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
    const file = formData.get('file') as File;

    if (!name || !description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: HttpStatusCode.BadRequest },
      );
    }

    let mediaData: any = {
      name,
      description,
      isPublished,
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

    const product = await IProfile.create(mediaData);

    return NextResponse.json(
      { product, message: 'Your profile has been created' },
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
  const token = await getToken({ req, secret, raw: true });
  if (!token || token === 'null') {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  await connectMongo();
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }
    const tag = await IProfile.findByIdAndDelete(id);
    if (!tag) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { tag, message: 'Profile deleted successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  if (!token || token === 'null') {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  await connectMongo();
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  const body = await req.json();
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }
    const tag = await IProfile.findByIdAndUpdate(id, body, { new: true });
    if (!tag) {
      return NextResponse.json({ message: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json(
      { tag, message: 'Profile updated successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 },
    );
  }
}
