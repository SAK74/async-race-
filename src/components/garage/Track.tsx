import type { ComponentProps, FC, RefObject } from 'react';
import cn from '@/utils/cn';
import CarIcon from './CarIcon';

const Track: FC<
  ComponentProps<'div'> & { name: string; color: string; carRef: RefObject<HTMLDivElement> }
> = function ({ name, className, color, carRef }) {
  const finalClass = cn(
    'border-b-2 border-t-2 border-dashed relative flex-grow -z-10 -skew-x-12',
    className
  );

  return (
    <div className={finalClass}>
      <CarIcon fill={color} className="absolute w-28 bottom-1 skew-x-12" ref={carRef} />

      <span className="tracking-widest text-gray-400 ml-32 border-l-4 border-dashed pl-4">
        {name}
      </span>
      <div className="absolute right-28 bottom-0 text-2xl">🏁</div>
    </div>
  );
};

export default Track;
