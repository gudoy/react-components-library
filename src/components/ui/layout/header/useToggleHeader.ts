import { useCallback, useEffect, useRef } from 'react';

import type { MouseEventHandler} from 'react';

function useToggleHeader(headerSelector = '#header') {
  const headerRef = useRef<HTMLElement | null>(null);

  const handleToggleClick: MouseEventHandler = useCallback((e) => {
    e.preventDefault();

    if (headerRef.current) {
      headerRef.current.classList.toggle('is-open');
    }
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      return;
    }

    headerRef.current = document.querySelector(headerSelector);
  }, [headerSelector]);

  return { onClick: handleToggleClick };
}

export default useToggleHeader;
