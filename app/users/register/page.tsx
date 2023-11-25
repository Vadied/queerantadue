import Link from 'next/link';
import { RegisterForm } from '@/ui';
import { login } from '@/assets/constants/navigation';

const Page = async () => {
  return (
    <>
      <h1 className="text-xl text-center">Registrati!</h1>
      <p>Solo le email autorizzate possono essere registrate</p>

      <div className="bg-background-lighter rounded p-10">
        <RegisterForm />
        <div className="flex flex-col items-end text-sm">
          <p>Sei già registrato?</p>
          <Link href={login.href} className="text-link hover:text-white">
            Fai qui il Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
