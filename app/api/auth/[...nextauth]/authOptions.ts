import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import connect from '@/lib/database';
import { User } from '@/lib/users/User';

const authOptions = {
  pages: {
    signIn: '/users/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'queerantadue@arcigay.it'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          await connect();
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) return null;

          const isValid = await user.comparePassword(credentials.password);
          if (!isValid) return null;

          return user;
        } catch (error: any) {
          console.error('error', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async session({ session }: any) {
      await connect();
      const sessionUser = await User.findOne({ email: session.user.email });
      if (!sessionUser) return session;

      session.user = {
        name: `${sessionUser.name} ${sessionUser.surname}`,
        email: sessionUser.email,
        image: session.user.image || sessionUser.image || '',
        _id: sessionUser?._id.toString()
      };

      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connect();
        const user = await User.findOne({ email: profile?.email || '' });
        if (!user) return false;

        if (profile?.picture && user.image !== profile?.picture) {
          await User.updateOne(
            { email: profile?.email },
            {
              image: profile?.picture
            }
          );
        }

        return true;
      } catch (error: any) {
        console.error('error', error);
        return false;
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
