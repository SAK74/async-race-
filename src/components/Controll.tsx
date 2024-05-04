import { FC } from 'react';
import { Button } from './ui';
import { switchSound, useTypedDispatch, useTypedSelector } from '@/store';

const Controll: FC = function () {
  const { isSound } = useTypedSelector((state) => state.garage);
  const dispatch = useTypedDispatch();
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          dispatch(switchSound());
        }}
      >
        {isSound ? '🔈' : '🔇'}
      </Button>
    </div>
  );
};

export default Controll;
