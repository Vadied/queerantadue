import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { LoginForm } from '@/ui';

import authOptions from '@/api/auth/[...nextauth]/authOptions';

const Page = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (session?.user) redirect('/admin');

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Page;
