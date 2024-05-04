import type { FC, PropsWithChildren } from 'react';
import Wave from '@/utils/WaveEffect';

const Header: FC<PropsWithChildren> = function ({ children }) {
  return (
    <header className="w-full flex justify-between px-8 pt-8 pb-4">
      {children}
      <span className="uppercase text-4xl sm:text-5xl font-extrabold font-serif italic text-cyan-200 w-min md:w-max lg:w-max lg:mr-6">
        <Wave text="Async race" />
      </span>
    </header>
  );
};

export default Header;
