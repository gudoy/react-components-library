import { type ReactNode, type MouseEventHandler } from 'react';

import CloseDialogAction from '@/components/ui/dialogs/dialog/header/closeAction/CloseDialogAction';

type DialogHeaderProps = {
  onClose: MouseEventHandler;
  title: string | ReactNode;
};

function DialogHeader(props: DialogHeaderProps) {
  const { title, onClose } = props;

  return (
    <header className="header dialog-header">
      {typeof title === 'string' ? <h2 className="title">{title}</h2> : title}
      <CloseDialogAction onClose={onClose} />
    </header>
  );
}

export default DialogHeader;
