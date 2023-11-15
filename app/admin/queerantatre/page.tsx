import Link from "next/link";

const Page = () => {
  return <div>
    <h1>Queerantatrè</h1>
    <div>
      <Link href="/admin/queerantatre/questions">Domande e Risposte</Link>
      <Link href="/admin/queerantatre/categories">Categorie</Link>
    </div>
  </div>;
};

export default Page;
