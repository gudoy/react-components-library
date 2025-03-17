import { type MouseEvent, useCallback, useRef } from 'react';

type usePreventClickOutsideConfig = {
  closeOnBackdropClick?: boolean;
  modal?: boolean;
  onClose?: (event?: MouseEvent) => void;
};

function usePreventClickOutside(config: usePreventClickOutsideConfig) {
  const { closeOnBackdropClick = false, modal = false, onClose = () => void 0 } = config;

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

  // Note:
  // The following is kind a trick to properly handle the click 'outside' the dialog content
  // Basically, we need to know if the click started (mouseup) on the dialog content or not
  // If we do not do this and just listen for click on the container/backdrop and just prevent the event propagation
  // on click on the dialog content, then when we click on the dialog content and drag the mouse outside of it
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
    handleBackDropClick,
    handleMouseDown,
    handleMouseUp,
  };
}

export default usePreventClickOutside;
