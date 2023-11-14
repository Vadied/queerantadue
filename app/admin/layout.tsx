import { Suspense } from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { Sidebar, Navbar } from '@/ui';
import Provider from '@/ui/provider';

export const metadata = {
  title: 'Admin',
  description: 'Manager'
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Provider >
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
