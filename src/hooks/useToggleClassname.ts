import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';

function useToggleClassname(selector: string, classname: string) {
  const elementRef = useRef<HTMLElement | null>(null);

  const handleToggleClick: MouseEventHandler = useCallback((e) => {
    e.preventDefault();

    if (elementRef.current) {
      elementRef.current.classList.toggle(classname);
    }
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      return;
    }

    elementRef.current = document.querySelector(selector);
  }, [selector]);

  return { onClick: handleToggleClick };
}

export default useToggleClassname;
