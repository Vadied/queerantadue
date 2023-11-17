import { ReactNode } from 'react';
import { Session } from 'next-auth';

import Provider from '@/ui/provider';
import { Navbar, Sidebar } from '@/ui';

export const metadata = {
  title: 'Admin',
  description: 'Manager'
};

type Props = {
  children: ReactNode;
  session: Session;
};
export default function RootLayout({ children, session }: Props) {
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
