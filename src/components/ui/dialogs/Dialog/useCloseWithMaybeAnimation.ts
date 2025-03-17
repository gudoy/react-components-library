import { type MouseEvent, type RefObject, useCallback } from 'react';

type useCloseWithMaybeAnimationConfig = {
  innerRef?: RefObject<HTMLDivElement>;
  onClose?: (event?: MouseEvent) => void;
};

function useCloseWithMaybeAnimation(config: useCloseWithMaybeAnimationConfig) {
  const { innerRef, onClose = () => void 0 } = config;

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (!innerRef?.current) {
        onClose(event);
      }

      // Trigger the closing animation.
      // Once the animation ends, the onClose callback will be called.
      innerRef?.current?.classList.add('is-closing');
    },
    [innerRef, onClose]
  );

  const closeAfterClosingAnimation = useCallback(() => {
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

  return {
    handleClose,
    closeAfterClosingAnimation,
  };
}

export default useCloseWithMaybeAnimation;
