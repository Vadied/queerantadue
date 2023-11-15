import { getDataFiltered, fetchTotalPages} from '@/lib/queerantatre/questions';
import { Table, Search, Pagination } from '@/ui';

const columns = [
  { attribute: 'text', label: 'Domanda' },
  { attribute: 'answer', label: 'Risposta' },
  { attribute: 'categories', label: 'Categorie' }
];

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};
const Page = async ({ searchParams }: Props) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const questions = await getDataFiltered(query, currentPage);
  const totalPages = await fetchTotalPages(query);

  const data = questions.map(({ text, answer, categories }) => {
    return {
      text,
      answer,
      categories: categories.map((cat) => cat.label).join(', ')
    };
  });

  return (
    <div>
      <h1 className="uppercase text-4xl mb-6">Queerantatrè</h1>
      <div>
        <Search placeholder="Cerca per testo" />
        <Table data={data} columns={columns} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
