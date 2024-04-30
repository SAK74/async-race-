import { useCreateCarMutation, useUpdateCarMutation } from '@/store';
import { CarInput } from '.';
import { type Car } from '@/types';
import { useCallback, type Dispatch, type FC, type SetStateAction } from 'react';
import { AMOUNT_OF_CARS_GENERATING } from '@/_constants';
import { faker } from '@faker-js/faker';

const GarageControll: FC<{
  selectedCar?: Car;
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
  onStart: () => void;
  onReset: () => void;
}> = ({ selectedCar, selectCar, onStart, onReset }) => {
  const [createCar] = useCreateCarMutation();
  const onCreate = useCallback((car: Omit<Car, 'id'>) => {
    createCar(car);
  }, []);

  const [updateCar, { isSuccess }] = useUpdateCarMutation();
  const onUpdate = useCallback((car: Omit<Car, 'id'>) => {
    if (!selectedCar || (selectedCar.name === car.name && selectedCar.color === car.color)) {
      return;
    }
    updateCar({ ...car, id: selectedCar.id });
    if (isSuccess) {
      selectCar(undefined);
    }
  }, []);

  const onGenerate = useCallback(() => {
    for (let i = 0; i < AMOUNT_OF_CARS_GENERATING; i += 1) {
      createCar({ name: faker.vehicle.vehicle(), color: faker.vehicle.color() });
    }
  }, []);

  return (
    <div className="flex justify-around">
      <button type="button" onClick={onStart}>
        Race
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <CarInput type="create" onSubmit={onCreate} />
      <CarInput
        type="update"
        onSubmit={onUpdate}
        name={selectedCar?.name}
        color={selectedCar?.color}
      />
      <button type="button" onClick={onGenerate}>
        Generate {AMOUNT_OF_CARS_GENERATING} cars
      </button>
    </div>
  );
};

export default GarageControll;
