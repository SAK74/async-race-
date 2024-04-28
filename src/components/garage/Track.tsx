// import { GarageContext } from '@/pages/Garage';
import cn from '@/utils/cn';
import { ComponentProps, ForwardRefRenderFunction, forwardRef, memo } from 'react';

const Track: ForwardRefRenderFunction<HTMLDivElement, ComponentProps<'div'> & { name: string }> = (
  { name, className },
  ref
) => {
  const _className = cn(
    'border-b-2 border-t-2 border-dashed relative flex-grow -z-10 -skew-x-12',
    className
  );

  // const ctx = useContext(GarageContext);
  return (
    <div className={_className} ref={ref}>
      <span className="tracking-widest text-gray-400 ml-32 border-l-4 border-dashed pl-4">
        {name}
      </span>
      <div className="absolute right-28 bottom-0 text-2xl">🏁</div>
    </div>
  );
};

export default memo(forwardRef(Track));
