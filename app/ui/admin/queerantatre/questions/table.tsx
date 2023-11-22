import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { TActualQuestion } from '@/types/queerantatre.model';
import { deleteData } from '@/lib/queerantatre/questions/actions';

type Props = {
  data: TActualQuestion[];
};
const Table = ({ data }: Props) => {
  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Testo</td>
          <td className="p-2">Risposta</td>
          <td className="p-2">Categorie</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-2 max-w-xs">{item.text}</td>
            <td className="p-2 max-w-xs">{item.answer}</td>
            <td className="p-2">Categorie</td>
            <td className="p-2">
              <div className="flex flex-col gap-2">
                <Link href={`/admin/queerantatre/questions/${item.slug}`}>
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
