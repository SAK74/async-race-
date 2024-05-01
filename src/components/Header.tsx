import Wave from '@/utils/WaveEffect';
import type { FC, PropsWithChildren } from 'react';

const Header: FC<PropsWithChildren> = function ({ children }) {
  return (
    <header className="w-full flex justify-between px-8 pt-8 pb-4">
      {children}
      <span className="uppercase text-5xl font-extrabold font-serif italic mr-6 text-cyan-200">
        <Wave text="Async race" />
      </span>
    </header>
  );
};

export default Header;
