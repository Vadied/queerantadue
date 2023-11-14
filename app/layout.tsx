import './globals.css';

import getServerSession from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import Provider from '@/ui/provider';

export const metadata = {
  title: 'Queerantadue',
  description: 'Your boardgame night manager'
};

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const { session } = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
