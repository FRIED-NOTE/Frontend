import { mergeRef } from '@/utils/components';
import { HTMLAttributes, ReactNode, useContext, useLayoutEffect } from 'react';

import { useClickOutside } from '@/utils/hooks';
import { PopoverContext } from '../context';
import { useRect } from '../hooks';

export interface PopoverContentProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  triggerPopoverMargin?: number;
}

function PopoverContent({
  children,
  triggerPopoverMargin,
  ...props
}: PopoverContentProps) {
  const { triggerRect, position, setIsShow, triggerRef, isShow } =
    useContext(PopoverContext);
  const refClickOutside = useClickOutside(() => {
    if (isShow) setIsShow(false);
  }, triggerRef);
  const { ref, rect, setRect } = useRect({
    position,
    triggerRect,
    triggerPopoverMargin,
  });

  useLayoutEffect(() => {
    setRect({ triggerRect, position, triggerPopoverMargin });
  }, [isShow, triggerRect, triggerPopoverMargin, position]);

  const mergedRef = mergeRef(ref, refClickOutside);

  return (
    <dialog
      open={isShow}
      ref={mergedRef}
      css={{
        position: 'absolute',
        backgroundColor: 'inherit',
        margin: 0,
        border: 0,
        padding: 0,
        zIndex: 2,
        ...rect,
      }}
      {...props}
    >
      {children}
    </dialog>
  );
}

export default PopoverContent;
