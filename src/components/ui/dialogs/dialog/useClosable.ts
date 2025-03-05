import { type MouseEvent, type RefObject, useCallback, useLayoutEffect, useRef } from 'react';

type UseClosableConfig = {
  innerRef?: RefObject<HTMLDivElement>;
  onClose?: (event?: MouseEvent) => void;
  modal?: false;
  closeOnBackdropClick?: boolean;
};

function useClosable(closableConfig: UseClosableConfig) {
  const { innerRef, onClose = () => undefined, closeOnBackdropClick = false, modal = false } = closableConfig;

  useLayoutEffect(() => {
    if (!innerRef?.current) {
      return;
    }

    const dialog = innerRef.current;
    dialog?.addEventListener('animationend', (event: AnimationEvent) => {
      if (event.animationName === 'closing-animation') {
        onClose();
      }
    });
  }, [innerRef, onClose]);

  const handleBackDropClick = useCallback(
    (event: MouseEvent) => {
      if (!closeOnBackdropClick) {
        return;
      }

      if (modal && !hasClickStartedOnContentRef.current) {
        onClose(event);
      } else {
        hasClickStartedOnContentRef.current = false;
      }
    },
    [closeOnBackdropClick, modal, onClose]
  );

  const handleClose = useCallback(
    (event: MouseEvent) => {
      // Trigger the closing animation.
      // Once the animation ends, the onClose callback will be called.
      if (innerRef?.current?.classList.contains('is-animated')) {
        innerRef?.current?.classList.add('is-closing');
      } else {
        onClose(event);
      }
    },
    [innerRef, onClose]
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!closeOnBackdropClick) {
        return;
      }

      event.stopPropagation();
    },
    [closeOnBackdropClick]
  );

  // Note:
  // The following is kind a trick to properly handle the click 'outside' the dialog content
  // Basically, we need to know if the click started (mouseup) on the dialog content or not
  // If we do not do this and just listen for click on the container/backdrop and just prevent the event propagation
  // on click on the dialog content, then when we click on the dialog content and drag the mouse outside the dialog content
  // and release the mouse, the dialog will close, which is not the expected behavior.
  const hasClickStartedOnContentRef = useRef(false);
  const hasClickStartedOnContentTimeoutRef = useRef(0);

  const handleMouseUp = () => {
    hasClickStartedOnContentTimeoutRef.current = window.setTimeout(() => {
      hasClickStartedOnContentRef.current = false;
    });
  };

  const handleMouseDown = () => {
    window.clearTimeout(hasClickStartedOnContentTimeoutRef.current);
    hasClickStartedOnContentRef.current = true;
  };

  return {
    handleClose,
    handleMouseUp,
    handleMouseDown,
    handleBackDropClick,
    handleClick,
  };
}

export default useClosable;
