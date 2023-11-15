import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connect from '@/lib/database';
import { User } from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user._id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connect();

        console.log('profile', profile);
        const useExists = await User.findOne({ email: profile?.email || '' });
        if (!useExists)
          await User.create({
            email: profile?.email || '',
            username: profile?.name?.replace(' ', '').toLowerCase() || '',
            roles: ['user']
          });

        return true;
      } catch (error: any) {
        console.log('error', error);
        return false;
      }
    }
  },
  secret: process.env.JWT_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
