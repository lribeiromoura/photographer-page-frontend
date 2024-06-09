/* eslint-disable */
import { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/auth-mongodb';
import connectMongo from '@/lib/mongodb';
import User from '@/models/user/user';
import bcryptjs from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          console.log('Missing credentials');
          return null;
        }

        await connectMongo();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          console.log('User not found');
          return null;
        }

        const isPasswordValid = bcryptjs.compareSync(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          console.log('Invalid password');
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 60 * 60 * 24 * 7,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        session.user.email = token.email;
        return session;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/admin/media';
    },
  },
};
