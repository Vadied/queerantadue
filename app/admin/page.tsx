import Link from 'next/link';

const Page = async () => {
  return (
    <div className="">
      <h1 className="text-3xl mb-2">Benvenuti nel Queerantadue!</h1>
      <p className="mb-6">Prossime date</p>
      <ul>
        <li>
          <li>12 gennaio</li>
          <li>16 febbraio</li>
          <li>8 marzo</li>
          <li>19 aprile</li>
          <li>17 maggio</li>
          <li>21 giugno</li>
          <li>19 luglio</li>
        </li>
      </ul>
    </div>
  );
};

export default Page;
