import { FC } from 'react';

const Pagination: FC<{ page?: number; pages?: number }> = function ({ page, pages }) {
  return (
    <div>
      Pagination:
      <span>page: {page}</span>
      <span>pages: {pages || '?'}</span>
    </div>
  );
};

Pagination.defaultProps = { page: 1, pages: undefined };

export default Pagination;
