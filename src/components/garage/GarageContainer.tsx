// import { faker } from '@faker-js/faker';
import { FC, RefObject } from 'react';
import { CarLine } from '.';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';
import { Car } from '@/types';

// const fakenCars: Car[] = new Array(2)
//   .fill('')
//   .map((_, i) => ({ id: i + 1, name: faker.vehicle.vehicle(), color: faker.vehicle.color() }));

const GarageContainer: FC<{ cars?: (Car & { carRef: RefObject<HTMLDivElement> })[] }> = ({
  cars,
}) => {
  const { page } = useTypedSelector((state) => state.garage);

  const { isLoading, isFetching } = useGetCarsByPageQuery({ page }, {});
  // console.log({ data });

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

export default GarageContainer;
