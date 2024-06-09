import connectMongo from '@/lib/mongodb';
import User from '@/models/user/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: Request) {
  const { username, password, email } = await request.json();

  if (!username || !password || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await connectMongo();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user
  const newUser = new User({ username, password: hashedPassword, email });
  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully' });
}
