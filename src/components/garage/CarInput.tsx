import { FC, FormEventHandler } from 'react';

const CarInput: FC<{ type: 'create' | 'update'; onSubmit: () => void }> = function ({
  type,
  onSubmit,
}) {
  const handleSubmit: FormEventHandler = (ev) => {
    ev.preventDefault();
    onSubmit();
  };
  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      <input type="text" name="car-name" className="text-neutral-800" />
      <input type="color" name="car-color" className="w-6 cursor-pointer rounded-sm" />
      <button type="submit">{type === 'create' ? 'Create car' : 'Update car'}</button>
    </form>
  );
};

export default CarInput;
