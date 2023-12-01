import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { deleteData } from '@/lib/campaign/quests/actions';
import { TQuest } from '@/types/campaign.model';

type Props = {
  data: TQuest[];
};
const Table = ({ data }: Props) => {
  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Nome</td>
          <td className="p-2">Missione</td>
          <td className="p-2">Titolo</td>
          <td className="p-2">Punti</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.quest}</td>
            <td className="p-2">{item.title}</td>
            <td className="p-2">{item.points}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href={`/admin/campaign/quests/${item.slug}`}>
                  <button className="px-2 py-1 rounded text-text border-none bg-button-primary">
                    <PencilIcon width={20} height={20} />
                  </button>
                </Link>
                <form action={deleteData}>
                  <input type="hidden" name="_id" value={item._id} />
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
