import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {
  Cog6ToothIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import noProfile from '@/assets/images/no_profile.png';

import SideElement from '../sideElement';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/admin',
        icon: <Cog6ToothIcon width={20} />
      },
      {
        title: 'Users',
        path: '/admin/users',
        icon: <UserIcon width={20} />
      },
      {
        title: 'Queerantatre',
        path: '/admin/queerantatre',
        icon: <QuestionMarkCircleIcon width={20} />
      }
    ]
  }
];

const Sidebar = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex flex-col gap-4 bg-background-light p-5 sticky">
      <div className="flex items-center gap-5 mb-5 ">
        {/*<Image
          src={user?.image || noProfile}
          width={50}
          height={50}
          alt="profile image"
          className="rounded-full object-cover"
  />
        <div className="flex flex-cols">
          <div className="text-bold">{user?.username}</div>
          <div className="text-sm text-text-light">ruolo</div>
        </div>*/}
      </div>
      <ul className="list-none">
        {menuItems.map((item) => (
          <li key={item.title} className="">
            <div className="text-text-light text-bold text-sm my-2">
              {item.title}
            </div>
            <div className="flex flex-col gap-2">
              {item.list.map((subItem) => (
                <SideElement key={subItem.title} item={subItem} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button
        className="w-full p-5 flex gap-2 items-center rounded hover:bg-background-lighter"
        onClick={handleSignOut}
      >
        <ArrowLeftOnRectangleIcon width={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
