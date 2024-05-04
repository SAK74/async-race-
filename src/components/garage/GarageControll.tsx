import {
  useCallback,
  useContext,
  useEffect,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import { faker } from '@faker-js/faker';
import { useCreateCarMutation, useUpdateCarMutation } from '@/store';
import { CarInput } from '.';
import { type Car } from '@/types';
import { AMOUNT_OF_CARS_GENERATING } from '@/_constants';
import { Button } from '../ui';
import { GarageContext } from '@/pages/Garage';

const GarageControll: FC<{
  selectedCar?: Car;
  selectCar: Dispatch<SetStateAction<Car | undefined>>;
  onStart: () => void;
  onReset: () => void;
}> = function ({ selectedCar, selectCar, onStart, onReset }) {
  const [createCar] = useCreateCarMutation();
  const onCreate = useCallback(
    (car: Omit<Car, 'id'>) => {
      createCar(car);
    },
    [createCar]
  );

  const [updateCar, { isSuccess, data }] = useUpdateCarMutation();
  const onUpdate = useCallback(
    (car: Omit<Car, 'id'>) => {
      if (!selectedCar || (selectedCar.name === car.name && selectedCar.color === car.color)) {
        return;
      }
      updateCar({ ...car, id: selectedCar.id });
    },
    [selectedCar, updateCar]
  );

  useEffect(() => {
    selectCar(data);
  }, [isSuccess, data, selectCar]);

  const onGenerate = useCallback(() => {
    for (let i = 0; i < AMOUNT_OF_CARS_GENERATING; i += 1) {
      createCar({ name: faker.vehicle.vehicle(), color: faker.vehicle.color() });
    }
  }, [createCar]);

  const ctx = useContext(GarageContext);

  return (
    <div className="flex flex-wrap justify-around gap-y-2">
      <Button type="button" onClick={onStart} disabled={ctx?.isRace}>
        Race
      </Button>
      <Button type="button" onClick={onReset} disabled={!ctx?.isRace}>
        Reset
      </Button>
      <CarInput type="create" onSubmit={onCreate} />
      <CarInput
        type="update"
        onSubmit={onUpdate}
        name={selectedCar?.name}
        color={selectedCar?.color}
      />
      <Button type="button" onClick={onGenerate}>
        Generate {AMOUNT_OF_CARS_GENERATING} cars
      </Button>
    </div>
  );
};

GarageControll.defaultProps = { selectedCar: undefined };

export default GarageControll;
