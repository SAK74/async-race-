import { FC, useEffect, useRef, useState } from 'react';
import { CarControll } from '.';
import CarIcon from './CarIcon';
import Track from './Track';

const CarLine: FC<{ color: string; id: number; name: string }> = function ({ id, name, color }) {
  const carRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState<number | undefined>();
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => {
      setTrackWidth(trackRef.current?.clientWidth);
    };
    handler();
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <div className="relative mt-8 flex items-center">
      <CarIcon fill={color} className="absolute w-28 bottom-4 left-24" ref={carRef} />
      <CarControll
        car={{ id, name, color }}
        carRef={carRef.current}
        trackRef={trackRef.current}
        trackWidth={trackWidth}
      />
      <Track name={name} ref={trackRef} className="" />
    </div>
  );
};

export default CarLine;
