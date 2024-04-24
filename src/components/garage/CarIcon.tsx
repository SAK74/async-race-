import { forwardRef, ForwardRefRenderFunction, SVGProps, memo } from 'react';
import CarIcon from '@/assets/car.svg?react';

export const CarElement: ForwardRefRenderFunction<HTMLDivElement, SVGProps<SVGSVGElement>> = (
  { fill, className },
  ref
) => {
  return (
    <div ref={ref} className={className}>
      <CarIcon fill={fill} className="w-full" />
    </div>
  );
};

export default memo(forwardRef(CarElement));
