import { faker } from '@faker-js/faker';
import { Car } from '@/types';
import { CarLine } from '.';

const fakenCars: Car[] = new Array(2)
  .fill('')
  .map((_, i) => ({ id: i + 1, name: faker.vehicle.vehicle(), color: faker.vehicle.color() }));

const GarageContainer = function () {
  return (
    <div className="flex flex-col">
      <hr className="" />
      {fakenCars.map(({ id, name, color }) => (
        <CarLine key={id} id={id} name={name} color={color} />
      ))}
      <hr />
    </div>
  );
};

export default GarageContainer;
