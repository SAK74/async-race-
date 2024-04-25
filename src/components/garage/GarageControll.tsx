import { useCreateCarMutation, useUpdateCarMutation } from '@/store/apiSlice';
import { CarInput } from '.';
import { Car } from '@/types';
import { FC, useContext } from 'react';
import { GarageContext } from '@/pages/Garage';

const GarageControll: FC = () => {
  const [createCar] = useCreateCarMutation();
  const onCreate = (car: Omit<Car, 'id'>) => {
    createCar(car);
  };

  const [updateCar] = useUpdateCarMutation();
  const ctx = useContext(GarageContext);
  const onUpdate = (car: Omit<Car, 'id'>) => {
    const selectedCar = ctx?.selectedCar;
    if (!selectedCar || (selectedCar.name === car.name && selectedCar.color === car.color)) {
      return;
    }
    updateCar({ ...car, id: selectedCar.id });
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
      <button type="button">Generate cars</button>
    </div>
  );
};

export default GarageControll;
