import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import Provider from '@/ui/provider';
import { Navbar, Sidebar } from '@/ui';
import authOptions from '@/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin',
  description: 'Manager'
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <Provider session={session}>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-grow p-4">
          <Navbar />
          {children}
        </div>
      </div>
    </Provider>
  );
}
