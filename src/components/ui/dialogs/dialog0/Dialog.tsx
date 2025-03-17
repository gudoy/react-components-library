import { useCallback, useLayoutEffect, type MouseEvent, type ReactNode, type RefObject } from 'react';

import DialogHeader from '@/components/ui/dialogs/dialog0/header/DialogHeader';
import useCloseWithMaybeAnimation from '@/components/ui/dialogs/dialog0/useCloseWithMaybeAnimation';
import usePreventClickOutside from '@/components/ui/dialogs/dialog0/usePreventClickOutside';

import './Dialog.scss';

export type DialogProps = {
  isOpen: boolean;
  title?: ReactNode | string;
  onClose?: (event?: MouseEvent) => void;
  className?: string;
  modal?: boolean;
  children?: ReactNode;
  innerRef?: RefObject<HTMLDivElement>;
  closeOnBackdropClick?: boolean;
};

function Dialog(props: DialogProps) {
  const {
    className = '',
    title,
    isOpen = false,
    modal = false,
    onClose = () => undefined,
    children,
    innerRef,
    closeOnBackdropClick = false,
  } = props;

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!closeOnBackdropClick) {
        return;
      }

      event.stopPropagation();
    },
    [closeOnBackdropClick]
  );

  const { handleClose, closeAfterClosingAnimation } = useCloseWithMaybeAnimation({ onClose });

  const { handleBackDropClick, handleMouseDown, handleMouseUp } = usePreventClickOutside({
    modal,
    onClose,
    closeOnBackdropClick,
  });

  useLayoutEffect(() => {
    closeAfterClosingAnimation();
  }, [closeAfterClosingAnimation]);

  const classNames = ['dialog-wrapper', isOpen ? 'is-open' : '', modal ? 'is-modal' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={innerRef} className={classNames} onClick={handleBackDropClick}>
      <dialog
        className={`dialog`}
        open={isOpen}
        role="dialog"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <DialogHeader onClose={handleClose} title={title} />
        <div className="content">{children}</div>
      </dialog>
    </div>
  );
}

export default Dialog;
