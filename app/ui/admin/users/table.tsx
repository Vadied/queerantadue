import Image from 'next/image';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { toggleUser } from '@/lib/users/actions';
import { TUser } from '@/types/user';
import noProfile from '@/assets/images/no_profile.png';

type Props = {
  data: TUser[];
};
const Table = ({ data }: Props) => {
  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <td className="p-2">Nome</td>
          <td className="p-2">Email</td>
          <td className="p-2">Creato il</td>
          <td className="p-2">Status</td>
          <td className="p-2">Azioni</td>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user._id}>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <Image
                  src={user.image || noProfile}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                {user.name} {user.surname}
              </div>
            </td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.createdAt?.toString().slice(4, 16)}</td>
            <td className="p-2">{user.isActive ? 'active' : 'passive'}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <Link href={`/admin/users/${user.slug}`}>
                  <button className="px-2 py-1 rounded text-text border-none bg-button-success">
                    <PencilIcon width={20} height={20} />
                  </button>
                </Link>
                <form action={toggleUser}>
                  <input type="hidden" name="slug" value={user.slug} />
                  <input
                    type="hidden"
                    name="isActive"
                    value={user.isActive ? 'true' : ''}
                  />
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
