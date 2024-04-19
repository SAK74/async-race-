import { FC, PropsWithChildren } from 'react';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="w-full flex justify-between">
      {children}
      <span>Header</span>
    </header>
  );
};
