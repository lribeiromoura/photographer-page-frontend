import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const sendEmail = async (
  name: string,
  emailFrom: string,
  message: string,
) => {
  const smtp_password = process.env.NEXT_PUBLIC_SMTP_PASSWORD;
  const smtp_username = process.env.NEXT_PUBLIC_SMTP_EMAIL;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtp_username,
      pass: smtp_password,
    },
  });

  try {
    // const email = await transport.sendMail({
    //   from: smtp_username,
    //   to: process.env.NEXT_PUBLIC_SMTP_EMAIL,
    //   subject: `New contact from ${name}`,
    //   html: `<h1>Name: ${name}</h1><h1>From ${emailFrom}</h1><p>${message}</p>`,
    // });

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 },
    );
  }
};
