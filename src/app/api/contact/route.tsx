import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');
import { getToken } from 'next-auth/jwt';
import { HttpStatusCode } from 'axios';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  if (!token || token === 'null') {
    return NextResponse.json(
      { message: 'You are not authorized to access this resource' },
      { status: HttpStatusCode.Unauthorized },
    );
  }
  const smtp_username = process.env.NEXT_PUBLIC_SMTP_EMAIL;
  const smtp_password = process.env.NEXT_PUBLIC_SMTP_PASSWORD;

  const formData = await req.formData();
  const name = formData.get('name');
  const emailFrom = formData.get('email');
  const message = formData.get('message');

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtp_username,
      pass: smtp_password,
    },
  });
  try {
    const email = await transport.sendMail({
      from: smtp_username,
      to: process.env.NEXT_PUBLIC_SMTP_EMAIL,
      subject: `New contact from ${name}`,
      html: `<h1>Name: ${name}</h1><h1>From ${emailFrom}</h1><p>${message}</p>`,
    });
    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 },
    );
  }
}
