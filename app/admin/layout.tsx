import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import authOptions from '@/api/auth/[...nextauth]/authOptions';
import { Navbar, Sidebar } from '@/ui';
import Provider from '@/ui/provider';
import { login } from '@/assets/constants/navigation';

export const metadata = {
  title: 'Admin',
  description: 'Manager'
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session?.user) redirect(login.href);

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
