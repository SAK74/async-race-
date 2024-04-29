import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal: FC<PropsWithChildren<{ onClose: () => void }>> = ({ children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 5000);
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-transparent backdrop:backdrop-blur-[2px] px-8 relative animate-grow"
    >
      <div className="absolute right-2 top-0 text-3xl cursor-pointer" onClick={onClose}>
        ❌
      </div>
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
