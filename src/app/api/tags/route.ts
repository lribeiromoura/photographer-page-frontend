import connectMongo from '@/lib/mongodb';
import ITag from '@/models/tag/tag';
import { NextRequest, NextResponse } from 'next/server';

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
