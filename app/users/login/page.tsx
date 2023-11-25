import Link from 'next/link';
import { LoginForm } from '@/ui';
import { register } from '@/assets/constants/navigation';

const Page = async () => {
  return (
    <>
      <h1 className="text-xl text-center">Fai qui il tuo login</h1>
      <div className="bg-background-lighter rounded p-10">
        <LoginForm />
        <div className="flex flex-col items-end text-sm">
          <p>Non sei registrato?</p>
          <Link href={register.href} className="text-link hover:text-white">
            Registrati qui
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
