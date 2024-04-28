import { startEngine, stopEngine } from './engineApi';

export async function addAnimation(car: HTMLDivElement, id: string, trackWidth = 1000) {
  const carWidth = car.clientWidth;
  const { distance, velocity } = await startEngine(Number(id));
  return car.animate(
    [{ transform: 'translateX(0)' }, { transform: `translateX(${trackWidth - carWidth}px)` }],
    {
      duration: distance / velocity,
      fill: 'forwards',
      id: id.toString(),
    }
  );
}

export async function removeAnimation(car: HTMLDivElement, id: number) {
  await stopEngine(id);
  car.getAnimations().forEach((animation) => {
    animation.cancel();
  });
}
