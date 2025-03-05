import { Button } from '@/components/ui/buttons/button/button.tsx';
import CloseIcon from '@/components/ui/icons/close/CloseIcon.tsx';
import { useTranslation } from '@/utils/i18n.tsx';

const CloseButton = () => {
    const { t } = useTranslation();

    return <Button className="action close-action" icon={<CloseIcon />} title={t('commonCloseActionLabel')} />;
};

export default CloseButton;
