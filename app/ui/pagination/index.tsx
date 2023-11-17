'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { generatePagination } from '@/lib/utils';
import PaginationNumber from './PaginationNumber';
import PaginationArrow from './PaginationArrow';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('p')) || 1;

  if (totalPages < 2) return null;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('p', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPosition = (page: string | number, index: number) => {
    if (index === 0) return 'first';
    if (allPages.length === 1) return 'single';
    if (page === '...') return 'middle';
    if (index === allPages.length - 1) return 'last';

    return undefined;
  };

  return (
    <>
      <div className="flex gap-2">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-2 hover:bg-background">
          {allPages.map((page, index) => {
            const position = getPosition(page, index);

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}
