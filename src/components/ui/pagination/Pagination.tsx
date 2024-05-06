import { memo, type FC } from 'react';
import { Button } from '..';

const Pagination: FC<{
  page?: number;
  pages?: number;
  onSetPage: (page: number) => void;
}> = function ({ page = 1, pages, onSetPage }) {
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
    <div className="space-x-1">
      <Button variant="outline" disabled={page === 1} onClick={firstPage}>
        ◀◀
      </Button>
      <Button variant="outline" disabled={page === 1} onClick={prevPage}>
        ◀
      </Button>
      <span>
        page {page} of {pages || '?'}
      </span>
      <Button variant="outline" onClick={nextPage} disabled={isLastPage}>
        ▶
      </Button>
      <Button variant="outline" onClick={lastPage} disabled={isLastPage}>
        ▶▶
      </Button>
    </div>
  );
};

Pagination.defaultProps = { page: 1, pages: undefined };

export default memo(Pagination);
