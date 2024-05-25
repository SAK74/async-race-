import { forwardRef, ForwardRefRenderFunction, SVGProps, memo } from 'react';
import BlobIcon from '@/assets/blob.svg?react';
import { CarIcon } from '..';

export const CarElement: ForwardRefRenderFunction<
  HTMLDivElement,
  SVGProps<SVGSVGElement>
> = function ({ fill, className }, ref) {
  return (
    <div ref={ref} className={className}>
      <CarIcon fill={fill} className="w-full" />
      <BlobIcon className="absolute top-6 w-12 -right-0 -z-20 opacity-0" />
    </div>
  );
};

export default memo(forwardRef(CarElement));
