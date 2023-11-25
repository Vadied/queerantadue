import Link from 'next/link';

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
    <h1 className='text-3xl mb-2'>Benvenuti nel Queerantadue!</h1>
    <p className='mb-6'>Tutto quello che ti serve per gestire la tua serata giochi:</p>
      <ul>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="https://queerantatre.netlify.app/" target="_blank">
            <button className='px-2 py-1 rounded text-text border-none bg-button-primary'>Queerantatre</button>
          </Link>
        </li>
      </ul>
    </main>
  );
}
