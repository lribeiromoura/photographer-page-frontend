import { NextResponse } from 'next/server';

export async function GET(request: any) {
  console.log(request);
  try {
    console.log('Health check');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json({ message: `${res}` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error while health check' },
      { status: 500 },
    );
  }
}
