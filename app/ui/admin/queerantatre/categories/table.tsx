import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { deleteData } from '@/lib/queerantatre/categories/actions';
import { TActualCategory } from '@/types/queerantatre.model';

type Props = {
  data: TActualCategory[];
};
const Table = ({ data }: Props) => {
  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Nome</td>
          <td className="p-2">Codice</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="p-2">{item.label}</td>
            <td className="p-2">{item.code}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href={`/admin/queerantatre/categories/${item.code}`}>
                  <button className="px-2 py-1 rounded text-text border-none bg-button-primary">
                    <PencilIcon width={20} height={20} />
                  </button>
                </Link>
                <form action={deleteData}>
                  <input type="hidden" name="_id" value={item._id.toString()} />
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
