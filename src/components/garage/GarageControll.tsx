import { useCreateCarMutation, useUpdateCarMutation } from '@/store/apiSlice';
import { CarInput } from '.';
import { Car } from '@/types';
import { FC, useContext } from 'react';
import { GarageContext } from '@/pages/Garage';
import { AMOUNT_OF_CARS_GENERATING } from '@/_constants';
import { faker } from '@faker-js/faker';

const GarageControll: FC = () => {
  const [createCar] = useCreateCarMutation();
  const onCreate = (car: Omit<Car, 'id'>) => {
    createCar(car);
  };

  const [updateCar, { isSuccess }] = useUpdateCarMutation();
  const ctx = useContext(GarageContext);
  const onUpdate = (car: Omit<Car, 'id'>) => {
    const selectedCar = ctx?.selectedCar;
    if (!selectedCar || (selectedCar.name === car.name && selectedCar.color === car.color)) {
      return;
    }
    updateCar({ ...car, id: selectedCar.id });
    if (isSuccess) {
      ctx.selectCar(undefined);
    }
  };

  const onGenerate = () => {
    for (let i = 0; i < AMOUNT_OF_CARS_GENERATING; i += 1) {
      createCar({ name: faker.vehicle.vehicle(), color: faker.vehicle.color() });
    }
  };

  return (
    <div className="flex justify-around">
      <button type="button">Race</button>
      <button type="button">Reset</button>
      <CarInput type="create" onSubmit={onCreate} />
      <CarInput
        type="update"
        onSubmit={onUpdate}
        name={ctx?.selectedCar?.name}
        color={ctx?.selectedCar?.color}
      />
      <button type="button" onClick={onGenerate}>
        Generate {AMOUNT_OF_CARS_GENERATING} cars
      </button>
    </div>
  );
};

export default GarageControll;
