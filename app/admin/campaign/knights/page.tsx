import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { getDataFiltered } from '@/lib/campaign/quests/data';
import { Pagination, Search } from '@/ui';
import Table from '@/ui/admin/campaign/knights/table';
import { admin } from '@/assets/constants/navigation';

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
        <div className="flex gap-4">
          <Link href={admin.campaign.quests.href}>
            <button className="flex gap-2 items-center p-2 bg-button-primary text-text border-none rounded pointer">
              Missioni
            </button>
          </Link>
          <Link href={`${admin.queerantatre.questions.href}/new`}>
            <button className="flex gap-2 items-center p-2 bg-button-primary text-text border-none rounded pointer">
              <PlusCircleIcon height={20} /> Aggiungi
            </button>
          </Link>
        </div>
      </div>
      <Table data={data} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Page;
