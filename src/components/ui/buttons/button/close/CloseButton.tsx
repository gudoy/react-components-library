import Button from '@/components/ui/buttons/button/Button';
import CloseIcon from '@/components/ui/icons/actions/CloseIcon';
import { useTranslation } from '@/utils/i18n';

const CloseButton = () => {
  const { t } = useTranslation();

  return <Button className="action close-action" icon={<CloseIcon />} title={t('commonCloseActionLabel')} />;
};

export default CloseButton;
