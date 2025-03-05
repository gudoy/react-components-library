import AppLogo from '@/components/ui/layout/header/appLogo/AppLogo';
import MainNav from '@/components/ui/layout/header/mainNav/MainNav';
import ToggleHeaderSizeButton from '@/components/ui/layout/header/toggleHeaderSizeButton/ToggleHeaderSizeButton';

import useToggleIsMinimized from '@/hooks/useToggleIsMinimized';

import './Header.scss';

const Header = () => {
  const { isMinimized, toggleIsMinimized } = useToggleIsMinimized();
  const classNames = `header ${isMinimized ? 'is-minimized' : ''}`.replace(/\s+/g, ' ').trim();

  return (
    <header className={classNames} id="header">
      <AppLogo />
      <MainNav />
      <ToggleHeaderSizeButton isMinimized={false} onClick={toggleIsMinimized} />
    </header>
  );
};

export default Header;
