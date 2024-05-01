import type { FC, CSSProperties } from 'react';

interface CustomCSSProp extends CSSProperties {
  '--i': number;
}

const Wave: FC<{ text: string }> = ({ text }) => {
  return text.split('').map((letter, i) => (
    <span
      key={i}
      style={{ '--i': i } as CustomCSSProp}
      className="animate-flash text-white opacity-100"
    >
      {letter}
    </span>
  ));
};

export default Wave;
