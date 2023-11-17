'use client';

import { ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = {
  disabled?: boolean;
  placeholder?: string;
};
const Search = ({ placeholder = 'Search...' }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [handleSearch] = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('p', '1');
    if (e.target.value) {
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex items-center gap-2 bg-background-lighter p-2 rounded">
      <MagnifyingGlassIcon width={20} />
      <input
        type="text"
        className="bg-transparent border-none text-text outline-none"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
