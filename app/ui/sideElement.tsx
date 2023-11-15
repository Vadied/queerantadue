'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  to: string;
  children: ReactNode;
};

const SideElement = ({ to, children }: Props) => {
  const pathname = usePathname();

  if (pathname === to)
    return <div className="w-full bg-gray px-3 py-2 rounded ">{children}</div>;

  return (
    <Link href={to} className="w-full hover:bg-gray px-3 py-2 rounded ">
      {children}
    </Link>
  );
};

export default SideElement;
