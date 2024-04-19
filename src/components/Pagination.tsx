import { FC } from 'react';

export const Pagination: FC<{ page?: number; pages?: number }> = ({ page = 1, pages }) => {
  return (
    <div>
      Pagination:
      <span>page: {page}</span>
      <span>pages: {pages}</span>
    </div>
  );
};
