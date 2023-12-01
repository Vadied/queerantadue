import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { toggleData } from '@/lib/campaign/knights/actions';
import { TAdventurer } from '@/types/campaign.model';

type Props = {
  data: TAdventurer[];
};
const Table = ({ data }: Props) => {
  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Nome</td>
          <td className="p-2">Email</td>
          <td className="p-2">Punti</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-2">
              <div className="flex items-center gap-2">
                {item.name} {item.surname}
              </div>
            </td>
            <td className="p-2">{item.email}</td>
            <td className="p-2">{item.points}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href={`/admin/quests/${item.slug}`}>
                  <button className="px-2 py-1 rounded text-text border-none bg-button-primary">
                    <PencilIcon width={20} height={20} />
                  </button>
                </Link>
                <form action={toggleData}>
                  <input type="hidden" name="slug" value={item.slug} />
                  <button className="px-2 py-1 rounded text-text border-none bg-button-danger">
                    <TrashIcon width={20} height={20} />
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
