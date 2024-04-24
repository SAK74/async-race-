import { FC, useRef } from 'react';

const CarControll: FC<{
  id: number;
  carRef: HTMLDivElement | null;
  trackWidth?: number;
  trackRef: HTMLDivElement | null;
}> = function ({ id, carRef, trackWidth }) {
  const animationRef = useRef<Animation | null>(null);

  const onStart = () => {
    if (!carRef || !trackWidth) {
      return;
    }
    const carWidth = carRef.clientWidth;
    animationRef.current = carRef.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${trackWidth - carWidth}px)` }],
      {
        duration: 2000,
        fill: 'forwards',
      }
    );
  };

  const onStop = () => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current.cancel();
  };
  return (
    <div>
      <span className="inline-flex flex-col">
        <button type="button" className="text-xs p-1">
          Select
        </button>
        <button type="button" className="text-xs p-1">
          Remove
        </button>
      </span>
      <span className="inline-flex flex-col">
        <button type="button" className="text-xs p-1" onClick={onStart}>
          Start
        </button>
        <button type="button" className="text-xs p-1" onClick={onStop}>
          Stop
        </button>
      </span>
    </div>
  );
};

export default CarControll;
