import { FC } from 'react';

export const CarInput: FC<{ type: 'create' | 'update' }> = ({ type }) => {
  return (
    <form className="flex items-center gap-1">
      <input type="text" name="car-name" className="text-neutral-800" />
      <input type="color" name="car-color" className="w-6 cursor-pointer rounded-sm" />
      <button type="submit">{type === 'create' ? 'Create car' : 'Update car'}</button>
    </form>
  );
};
