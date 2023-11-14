import Link from 'next/link';

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1>Queerantadue</h1>
      <p>Tutto ciò che ti serve per la tua serata giochi</p>
      <ul>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </main>
  );
}
