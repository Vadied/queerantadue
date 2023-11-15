import { getDataFiltered, fetchTotalPages } from '@/lib/users';
import { Table, Search, Pagination } from '@/ui';

const columns = [
  { attribute: 'username', label: 'Username' },
  { attribute: 'email', label: 'Email' },
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
  const data = await getDataFiltered(query, currentPage);
  const totalPages = await fetchTotalPages(query);

  return (
    <div>
      <h1 className="uppercase text-4xl mb-6">Utenti</h1>
      <div>
        <Search placeholder="Cerca per nome" />
        <Table data={data} columns={columns} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
