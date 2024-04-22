import { CarInput } from './CarInput';

export const GarageControll = () => {
  return (
    <div className="flex justify-around">
      <button>Race</button>
      <button>Reset</button>
      <CarInput type="create" />
      <CarInput type="update" />
      <button>Generate cars</button>
    </div>
  );
};
