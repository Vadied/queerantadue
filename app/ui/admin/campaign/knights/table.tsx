'use client';

import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { deleteData } from '@/lib/campaign/knights/actions';
import { TAdventurer } from '@/types/campaign.model';
import { useCampaignContext } from '@/contexts/campaign';
import { admin } from '@/assets/constants/navigation';

type Props = {
  data: TAdventurer[];
};
const Table = ({ data }: Props) => {
  const { quests = [] } = useCampaignContext();

  const getPoints = (knight: TAdventurer) =>
    knight.quests.reduce((res, _id) => {
      const quest = quests.find((quest) => quest._id === _id);
      if (!quest) return res;

      return parseInt(quest.points) + res;
    }, 0);

  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Personaggio</td>
          <td className="p-2">Giocatore</td>
          <td className="p-2">Punti</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-2">{item.character}</td>
            <td className="p-2">
              <div className="flex items-center gap-2">
                {item.name} {item.surname}
              </div>
            </td>
            <td className="p-2">{getPoints(item)}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href={`${admin.campaign.knights.href}/${item.slug}`}>
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
