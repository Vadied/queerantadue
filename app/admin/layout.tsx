import { Suspense, ReactNode } from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { Sidebar, Navbar } from '@/ui';
import Provider from '@/ui/provider';
import { Session } from 'next-auth';

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
          <Suspense>
            <Navbar />
          </Suspense>
          <Box>
            <Sidebar>
              <Link href="/admin/users">Users</Link>
              <Link href="/admin/queerantatre">Queerantatrè</Link>
            </Sidebar>
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
