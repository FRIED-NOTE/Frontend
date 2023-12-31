import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  opened?: boolean;
  handleModalClose?: () => void;
  children: ReactNode;
}

export function Modal({
  opened: propsOpened,
  handleModalClose: propsHandleModalClose,
  children,
  ...props
}: ModalProps) {
  const [localModalOpened, setLocalModalOpened] = useState(false);
  const opened = propsOpened !== undefined ? propsOpened : localModalOpened;
  const handleModalClose =
    propsHandleModalClose !== undefined
      ? propsHandleModalClose
      : () => setLocalModalOpened(false);

  const closeModalByEsc: (this: Window, ev: KeyboardEvent) => void = (e) => {
    if (e.code === 'Escape') handleModalClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalByEsc);

    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
    };
  }, [opened]);

  return (
    <ModalWrapper handleModalClose={handleModalClose} opened={opened}>
      <div {...props}>{children}</div>
    </ModalWrapper>
  );
}
