import { type Car } from '@/types';
import { type FC, type FormEventHandler, memo } from 'react';

const CarInput: FC<{
  type: 'create' | 'update';
  name?: string;
  color?: string;
  onSubmit: (car: Omit<Car, 'id'>) => void;
}> = function ({ type, onSubmit, name, color }) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const formValues = new FormData(form);
    const carName = formValues.get('car-name');
    const carColor = formValues.get('car-color');
    if (!carName || !carColor) {
      return;
    }

    onSubmit({ name: carName as string, color: carColor as string });
    form.reset();
  };
  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      <input
        type="text"
        name="car-name"
        placeholder="Car model"
        defaultValue={name}
        className="text-neutral-800"
      />
      <input
        type="color"
        name="car-color"
        defaultValue={color ?? '#000000'}
        className="w-6 cursor-pointer rounded-sm"
      />
      <button type="submit">{type === 'create' ? 'Create car' : 'Update car'}</button>
    </form>
  );
};

export default memo(CarInput);
