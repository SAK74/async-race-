import { type FC } from 'react';
import ghPath from '@/assets/gh-logo.png';

const Footer: FC = function () {
  return (
    <>
      <hr className="w-11/12 border border-cyan-200" />
      <footer className="w-full px-8 py-1 flex justify-between items-center text-cyan-200">
        <div className="flex-grow text-center">
          <a href="https://github.com/SAK74" rel="noreferrer" target="_blank">
            <img src={ghPath} alt="gh-logo" className="size-10 inline" />
            <span>SAK74</span>
          </a>
        </div>
        <span>© 2024</span>
      </footer>
    </>
  );
};

export default Footer;
