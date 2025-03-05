import { useCallback, useState } from 'react';

function useToggleIsMinimized() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const toggleIsMinimized = useCallback(() => {
    console.log('toggleIsMinimized');
    setIsMinimized((value: boolean) => !value);
  }, []);

  return { isMinimized, toggleIsMinimized };
}

export default useToggleIsMinimized;
