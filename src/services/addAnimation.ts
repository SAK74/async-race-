export function addAnimation(car: HTMLDivElement, id: string, trackWidth = 1000) {
  const carWidth = car.clientWidth;
  return car.animate(
    [{ transform: 'translateX(0)' }, { transform: `translateX(${trackWidth - carWidth}px)` }],
    {
      duration: 2000,
      fill: 'forwards',
      id: id.toString(),
    }
  );
}
