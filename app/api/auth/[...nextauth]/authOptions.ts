import type { NextAuthConfig } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import connect from '@/lib/database';
import { User } from '@/lib/users/User';

const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/login'
  },
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

      console.log('session', session.user);
      return session;
    },
    authorized({ auth, request }: any) {
      const isLoggedIn = auth?.user;
      console.log('authorized', request.nextUrl.pathname);
      const isOnDashboard = request.nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', request.nextUrl));
      }

      return true;
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
        console.log('error', error);
        return false;
      }
    }
  },
  secret: process.env.JWT_SECRET
};

export default authOptions;
