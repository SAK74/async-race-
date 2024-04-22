import { Car } from '@/types';
import { faker } from '@faker-js/faker';
import { CarLine } from './CarLine';

const fakenCars: Car[] = new Array(2)
  .fill('')
  .map((_, i) => ({ id: i + 1, name: faker.vehicle.vehicle(), color: faker.vehicle.color() }));

export const GarageContainer = () => {
  return (
    <div className="flex flex-col">
      <hr className="" />
      {fakenCars.map((car) => (
        <CarLine key={car.id} {...{ ...car }} />
      ))}
      <hr />
    </div>
  );
};
