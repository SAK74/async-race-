import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal: FC<PropsWithChildren<{ onClose?: () => void }>> = ({ children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const crosRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let timeout: number | undefined;
    if (onClose) {
      timeout = window.setTimeout(onClose, 5000);
    }
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      crosRef.current?.focus();
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-transparent backdrop:backdrop-blur-[2px] p-8 relative animate-grow"
    >
      {onClose && (
        <button
          className="absolute right-2 top-0 text-3xl cursor-pointer focus:border-2 border-slate-300 p-2 rounded-md"
          onClick={onClose}
          onKeyDown={onClose}
          ref={crosRef}
          type="button"
        >
          ❌
        </button>
      )}
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
