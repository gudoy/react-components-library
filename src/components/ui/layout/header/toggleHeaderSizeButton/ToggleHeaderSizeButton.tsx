import Button from '@/components/ui/buttons/button/Button';
import LessIcon from '@/components/ui/icons/actions/LessIcon';

import './ToggleHeaderSizeButton.scss';
import { useCallback } from 'react';
import { t } from 'i18next';
import MoreIcon from '@/components/ui/icons/actions/MoreIcon';

type ToggleHeaderSizeButton = {
  isMinimized: boolean;
  onClick?: () => void;
};

function ToggleHeaderSizeButton(props: ToggleHeaderSizeButton) {
  const { isMinimized, onClick = () => undefined } = props;

  const handleToggleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <Button
      onClick={handleToggleClick}
      label={t('Toggle header size')}
      icon={isMinimized ? <MoreIcon /> : <LessIcon />}
      className="toggle-header-size-action"
    />
  );
}

export default ToggleHeaderSizeButton;
