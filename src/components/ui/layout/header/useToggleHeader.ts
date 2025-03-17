import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

function useToggleHeader(headerSelector = '#header') {
  const headerRef = useRef<HTMLElement | null>(null);

  const handleToggleClick: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (headerRef.current) {
        headerRef.current.classList.toggle('is-open');
      }
    },
    [headerRef.current]
  );

  useEffect(() => {
    if (headerRef.current) {
      return;
    }

    headerRef.current = document.querySelector(headerSelector);
  }, []);

  return { onClick: handleToggleClick };
}

export default useToggleHeader;
