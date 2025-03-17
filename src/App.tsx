import { useCallback, useState } from 'react';

import Button from '@/components/ui/buttons/button/Button';
import Dialog from '@/components/ui/dialogs/dialog0/Dialog';
import { useTranslation } from '@/utils/i18n';

import Header from './components/ui/layout/header/Header';
import ToggleMainMavButton from './components/ui/layout/header/toggleHeaderButton/ToggleHeaderButton';
import Page from './components/ui/layout/page/Page';

import './App.scss';

function App() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenDialogClick = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <Header />
      <Page className="home-page" title="Home | Your site name">
        <ToggleMainMavButton />
        <Button label={t('Open dialog')} onClick={handleOpenDialogClick} />
        <Dialog isOpen={isOpen} title={t('Sample Dialog')} onClose={handleOpenDialogClick}>
          <p>Lorem ipsum</p>
        </Dialog>
      </Page>
    </>
  );
}

export default App;
