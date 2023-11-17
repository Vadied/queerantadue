import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

const Page = async () => {
  const session = await getServerSession();
  console.log(session);
  return (
    <div className="">
      <h1 className='text-3xl mb-2'>Benvenuti nel Queerantadue!</h1>
      <p className='mb-6'>Al momento i servizi disponibili sono:</p>
      <ul>
        <li>
          <Link href="https://queerantatre.netlify.app/" target="_blank">
            <button className='px-2 py-1 rounded text-text border-none bg-button-primary'>Queerantatre</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
