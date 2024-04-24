import { CarInput } from '.';

const GarageControll = function () {
  return (
    <div className="flex justify-around">
      <button type="button">Race</button>
      <button type="button">Reset</button>
      <CarInput type="create" onSubmit={() => {}} />
      <CarInput type="update" onSubmit={() => {}} />
      <button type="button">Generate cars</button>
    </div>
  );
};

export default GarageControll;
