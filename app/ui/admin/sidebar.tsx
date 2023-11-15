import { ReactNode } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo512.png';
import { TUser } from '@/types/user';
import Link from 'next/link';

import { signOut } from 'next-auth/react';

import SideElement from '../sideElement';

type Props = {
  user?: TUser;
  children: ReactNode;
};
const Sidebar = ({ user, children }: Props) => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="flex flex-col gap-4 bg-background-subtle p-4">
      <div className="flex-grow flex flex-col gap-2">
        <SideElement to="/admin">
          <Image src={logo} alt="Logo Queerantadue" width={100} height={100} />
        </SideElement>
        {children}
      </div>
      <div>
        {user && (
          <>
            <Link href="/admin/quarantatre">Quarantatre</Link>
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
            <Link href="/admin/profile">
              <Image
                src={user?.image || ''}
                width={37}
                height={37}
                alt="profile image"
                className="rounded-full"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
