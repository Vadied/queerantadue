import NextAuth from 'next-auth';

import authOptions from './authOptions';

export const maxDuration = 30; // This function can run for a maximum of 5 seconds

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
