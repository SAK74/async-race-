import {
  type FC,
  type FormEventHandler,
  memo,
  useState,
  ChangeEventHandler,
  useEffect,
} from 'react';
import { type Car } from '@/types';
import { Button } from '../ui';
import { CarIcon } from '..';

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

  const [carColor, setCarColor] = useState(() => color);
  useEffect(() => {
    setCarColor(color);
  }, [color]);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setCarColor(value);
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
      {/* eslint-disable-next-line */}
      <label className="relative">
        <input
          type="color"
          name="car-color"
          defaultValue={color ?? '#000000'}
          className="absolute top-0 left-0 invisible"
          onChange={onChange}
        />
        <CarIcon fill={carColor} className="w-20 cursor-pointer" />
      </label>

      <Button type="submit" className="ml-2">
        {type === 'create' ? 'Create car' : 'Update car'}
      </Button>
    </form>
  );
};

CarInput.defaultProps = { name: undefined, color: undefined };

export default memo(CarInput);
