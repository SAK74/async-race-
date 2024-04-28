import { forwardRef, ForwardRefRenderFunction, SVGProps, memo } from 'react';
import CarIcon from '@/assets/car.svg?react';
import BlobIcon from '@/assets/blob.svg?react';

export const CarElement: ForwardRefRenderFunction<HTMLDivElement, SVGProps<SVGSVGElement>> = (
  { fill, className },
  ref
) => {
  return (
    <div ref={ref} className={className}>
      <CarIcon fill={fill} className="w-full" />
      <BlobIcon className="absolute top-0 w-12 -right-6 -z-20 opacity-0" />
    </div>
  );
};

export default memo(forwardRef(CarElement));
