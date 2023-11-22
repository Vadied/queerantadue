import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { Pagination, Search } from '@/ui';
import { getDataFiltered } from '@/lib/queerantatre/categories/data';
import Table from '@/ui/admin/queerantatre/categories/table';

type Props = {
  searchParams?: {
    q?: string;
    p?: string;
  };
};
const Page = async ({ searchParams }: Props) => {
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.p) || 1;
  const { totalPages = 0, data = [] } = await getDataFiltered(
    query,
    currentPage
  );

  return (
    <div className="bg-background-light p-5 rounded">
      <div className="flex flex-wrap justify-between mb-4">
        <Search placeholder="Cerca categoria per nome" />
        <Link href="/admin/queerantatre/categories/new">
          <button className="flex gap-2 items-center p-2 bg-button-primary text-text border-none rounded pointer">
            <PlusCircleIcon height={20} /> Aggiungi
          </button>
        </Link>
      </div>
      <Table data={data} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Page;
