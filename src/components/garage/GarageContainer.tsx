import type { FC, RefObject } from 'react';
import { CarLine } from '.';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';
import { Car } from '@/types';

const GarageContainer: FC<{ cars?: (Car & { carRef: RefObject<HTMLDivElement> })[] }> = function ({
  cars = [],
}) {
  const { page } = useTypedSelector((state) => state.garage);

  const { isLoading, isFetching } = useGetCarsByPageQuery({ page }, {});

  return (
    <div className="flex flex-col">
      <hr className="" />
      {(isLoading || isFetching) && <div className="text-center py-8">........Loading...</div>}

      {cars &&
        cars.map(({ id, name, color, carRef }) => (
          <CarLine key={id} id={id} name={name} color={color} carRef={carRef} />
        ))}
      <hr />
    </div>
  );
};

GarageContainer.defaultProps = { cars: [] };

export default GarageContainer;
