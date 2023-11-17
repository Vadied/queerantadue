'use client';

import { usePathname } from 'next/navigation';
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-5 bg-background-light mb-5">
      <div className="text-text-light text-bold capitalize">
        {pathname.split('/').pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-background-lighter p-2 rounded">
          <MagnifyingGlassIcon width={20} />
          <input type="text" className="bg-transparent border-none text-text" placeholder="Search..." />
        </div>
        <div className="flex gap-5">
          <ChatBubbleBottomCenterIcon width={20} />
          <BellIcon width={20} />
          <EyeIcon width={20} />
        </div>
      </div>
    </nav>
  );
}
