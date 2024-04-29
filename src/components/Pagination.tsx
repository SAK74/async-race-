import cn from '@/utils/cn';
import { FC } from 'react';

const Pagination: FC<{
  page: number;
  pages?: number;
  onSetPage: (page: number) => void;
  // prevPage: (page: number) => void;
}> = ({ page, pages, onSetPage }) => {
  const isLastPage = page === pages;

  const nextPage = () => {
    if (!pages) {
      return;
    }
    onSetPage(Math.min(pages, page + 1));
  };

  const prevPage = () => {
    onSetPage(Math.max(1, page - 1));
  };

  const lastPage = () => {
    if (!pages) {
      return;
    }
    onSetPage(pages);
  };

  const firstPage = () => {
    onSetPage(1);
  };
  return (
    <div className="space-x-4">
      <span onClick={firstPage} className={cn('text-2xl', { 'cursor-pointer': page !== 1 })}>
        ◀◀
      </span>
      <span onClick={prevPage} className={cn('text-2xl', { 'cursor-pointer': page !== 1 })}>
        ◀
      </span>
      <span>
        page {page} of {pages || '?'}
      </span>
      <span onClick={nextPage} className={cn('text-2xl', { 'cursor-pointer': !isLastPage })}>
        ▶
      </span>
      <span onClick={lastPage} className={cn('text-2xl', { 'cursor-pointer': !isLastPage })}>
        ▶▶
      </span>
    </div>
  );
};

Pagination.defaultProps = { page: 1, pages: undefined };

export default Pagination;
