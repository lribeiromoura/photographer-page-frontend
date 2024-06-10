import { HttpStatusCode } from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  if (!token || token === 'null') {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
