import GoogleProvider from 'next-auth/providers/google';
import connect from '@/lib/database';
import { User } from '@/lib/users/User';

const authOptions = {
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
        console.log('error', error);
        return false;
      }
    }
  }
};

export default authOptions;
