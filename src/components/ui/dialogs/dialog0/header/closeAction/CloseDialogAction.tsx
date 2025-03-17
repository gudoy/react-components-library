import { type MouseEventHandler } from 'react';

import Button from '@/components/ui/buttons/button/Button';
import CloseIcon from '@/components/ui/icons/actions/CloseIcon';
import { useTranslation } from '@/utils/i18n';

type CloseDialogActionProps = {
  onClose?: MouseEventHandler;
};

function CloseDialogAction(props: CloseDialogActionProps) {
  const { t } = useTranslation();
  const { onClose } = props;

  return (
    <Button
      className="action close-action"
      icon={<CloseIcon />}
      title={t('commonCloseActionLabel')}
      onClick={onClose}
    />
  );
}

export default CloseDialogAction;
