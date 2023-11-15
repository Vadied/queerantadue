import { Suspense, ReactNode } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import logo from '@/assets/images/logo512.png';

import Provider from '@/ui/provider';
import { Sidebar, Navbar, SideElement } from '@/ui';

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
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Provider session={session}>
          <>
            <div className="flex h-full">
              <Sidebar>
                <SideElement to="/admin/users">Users</SideElement>
                <SideElement to="/admin/queerantatre">Queerantatrè</SideElement>
              </Sidebar>
              <div className="flex-grow p-4">{children}</div>
            </div>
          </>
        </Provider>
      </body>
    </html>
  );
}
