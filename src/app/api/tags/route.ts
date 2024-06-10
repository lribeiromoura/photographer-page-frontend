import connectMongo from '@/lib/mongodb';
import ITag from '@/models/tag/tag';
import { HttpStatusCode } from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET() {
  try {
    await connectMongo();
    const tag = await ITag.find();
    return NextResponse.json(tag);
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
    const body = await req.json();
    const tag = await ITag.create(body);
    return NextResponse.json({
      tag,
      message: 'Tag created successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 },
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
    const tag = await ITag.findByIdAndDelete(id);
    if (!tag) {
      return NextResponse.json({ message: 'Tag not found' }, { status: 404 });
    }
    return NextResponse.json(
      { tag, message: 'Tag deleted successfully' },
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
    const tag = await ITag.findByIdAndUpdate(id, body, { new: true });
    if (!tag) {
      return NextResponse.json({ message: 'Tag not found' }, { status: 404 });
    }

    return NextResponse.json(
      { tag, message: 'Tag updated successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 },
    );
  }
}
