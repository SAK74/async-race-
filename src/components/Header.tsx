import { FC, PropsWithChildren } from 'react';

const Header: FC<PropsWithChildren> = function ({ children }) {
  return (
    <header className="w-full flex justify-between">
      {children}
      <span>Header</span>
    </header>
  );
};

export default Header;
