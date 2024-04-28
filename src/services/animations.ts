import { startEngine, stopEngine } from './engineApi';

export async function addAnimation(car: HTMLDivElement, id: string) {
  const carWidth = car.clientWidth;
  const trackWidth = car.parentElement?.clientWidth;
  if (!trackWidth) {
    throw Error('Wrong Track element..!');
  }
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

export function addBlobAnimation(element: Element | null) {
  element?.animate([{ opacity: 0 }, { opacity: 1, transform: 'scale(1.5)' }], {
    duration: 1000,
    fill: 'forwards',
  });
}
