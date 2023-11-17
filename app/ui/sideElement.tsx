'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  item: {
    title: string;
    path: string;
    icon: ReactNode;
  };
};

const SideElement = ({ item }: Props) => {
  const pathname = usePathname();

  if (pathname === item.path)
    return (
      <div className="w-full p-5 flex gap-2 items-center rounded bg-background-lighter">
        {item.icon} {item.title}
      </div>
    );

  return (
    <Link href={item.path} className="w-full p-5 flex gap-2 items-center rounded hover:bg-background-lighter">
      {item.icon} {item.title}
    </Link>
  );
};

export default SideElement;
