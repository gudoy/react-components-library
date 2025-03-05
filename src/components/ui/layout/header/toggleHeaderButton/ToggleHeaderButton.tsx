import Button from '@/components/ui/buttons/button/Button';
import MenuIcon from '@/components/ui/icons/navigation/MenuIcon';
import useToggleHeader from '@/components/ui/layout/header/useToggleHeader';

import './ToggleHeaderButton.scss';

function ToggleHeaderButton() {
  const { onClick: handleToggleClick } = useToggleHeader();

  return (
    <Button
      href="#home"
      onClick={handleToggleClick}
      label={'Toggle header (mobile-only)'}
      icon={<MenuIcon />}
      className="toggle-header-action"
    />
  );
}

export default ToggleHeaderButton;
