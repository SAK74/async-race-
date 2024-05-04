import { type FC, useState } from 'react';
// @ts-ignore
import nightwind from 'nightwind/helper';
import { Button } from './ui';
import { switchSound, useTypedDispatch, useTypedSelector } from '@/store';

const Controll: FC = function () {
  const { isSound } = useTypedSelector((state) => state.garage);
  const dispatch = useTypedDispatch();
  const [isDark, setIsDark] = useState(true);
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
      <Button
        variant="outline"
        onClick={() => {
          nightwind.toggle();
          setIsDark((prev) => !prev);
        }}
      >
        {isDark ? '🌙' : '☀'}
      </Button>
      {/* eslint-disable-next-line */}
      <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
    </div>
  );
};

export default Controll;
