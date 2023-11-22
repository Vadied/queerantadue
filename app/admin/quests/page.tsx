import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { getDataFiltered } from '@/lib/quests/data';
import { Pagination, Search } from '@/ui';
import Table from '@/ui/admin/quests/table';

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
        <Search placeholder="Cerca avventuriero per nome" />
        <Link href="/admin/quests/new">
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
