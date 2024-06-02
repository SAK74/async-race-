import { useEffect, useState, type FC, type RefObject } from 'react';
import { CarLine } from '.';
import { useGetCarsByPageQuery, useTypedSelector } from '@/store';
import { Car } from '@/types';
import Modal from '../Modal';

const GarageContainer: FC<{ cars?: (Car & { carRef: RefObject<HTMLDivElement> })[] }> = function ({
  cars = [],
}) {
  const { page } = useTypedSelector((state) => state.garage);

  const { isLoading, isFetching } = useGetCarsByPageQuery({ page }, {});

  const [isServerSleep, setIsServerSleep] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsServerSleep(true);
      }, 4000);
    } else {
      setIsServerSleep(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col">
      <hr className="" />
      {(isLoading || isFetching) && (
        <>
          <div className="text-center pt-8 pb-2">
            {isServerSleep ? (
              <Modal>
                <div className="bg-slate-200 px-6 pt-4 pb-8 text-gray-900 text-xl rounded-md font-medium text-center space-y-2 relative">
                  <p>Server is probably slept, we will wake it up in moment.. </p>
                  <p>Please be patient</p>
                  <p className="absolute bottom-0 animate-rolling">😉</p>
                </div>
              </Modal>
            ) : (
              '...Wait a moment...'
            )}
          </div>
          <div className="w-full h-6 bg-contain bg-car bg-no-repeat animate-race drop-shadow-[-15px_0_5px_rgba(0,0,0,.5)] bg-left" />
        </>
      )}

      {cars &&
        cars.map(({ id, name, color, carRef }) => (
          <CarLine key={id} id={id} name={name} color={color} carRef={carRef} />
        ))}
      <hr />
    </div>
  );
};

GarageContainer.defaultProps = { cars: [] };

export default GarageContainer;
