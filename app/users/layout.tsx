import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import authOptions from '@/api/auth/[...nextauth]/authOptions';
import { admin } from '@/assets/constants/navigation';

export const metadata = {
  title: 'Login',
  description: 'login/signup'
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const session: Session | null = await getServerSession(authOptions);
  if (session?.user) redirect(admin.href);

  return <div className="w-full h-full flex flex-col items-center justify-center gap-4">{children}</div>;
}
