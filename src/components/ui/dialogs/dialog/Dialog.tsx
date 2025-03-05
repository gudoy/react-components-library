import { type MouseEvent, type ReactNode, type RefObject } from 'react';

import Button from '@/components/ui/buttons/button/Button';
import CloseIcon from '@/components/ui/icons/actions/CloseIcon';

import { useTranslation } from '@/utils/i18n';

import './Dialog.scss';
import useClosable from '@/components/ui/dialogs/dialog/useClosable';

export type DialogProps = {
  isOpen: boolean;
  title?: ReactNode | string;
  onClose?: (event?: MouseEvent) => void;
  className?: string;
  modal?: boolean;
  children?: ReactNode;
  innerRef?: RefObject<HTMLDivElement>;
  closeOnBackdropClick?: boolean;
};

const Dialog = (props: DialogProps) => {
  const { className = '', title, isOpen = false, modal = false } = props;
  const { onClose = () => undefined, children, innerRef, closeOnBackdropClick = false } = props;

  const { handleBackDropClick, handleClick, handleMouseDown, handleMouseUp, handleClose } = useClosable({
    innerRef,
    closeOnBackdropClick,
    onClose,
  });

  const { t } = useTranslation();

  const classNames = ['dialog', isOpen ? 'is-open' : '', modal ? 'is-modal' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={innerRef} className={classNames} onClick={handleBackDropClick}>
      <dialog
        className={`dialog-wrapper`}
        open={isOpen}
        role="dialog"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <header className="header">
          {typeof title === 'string' ? <h2 className="title">{title}</h2> : title}

          <Button
            className="action close-action"
            icon={<CloseIcon />}
            title={t('commonCloseActionLabel')}
            onClick={handleClose}
          />
        </header>

        <div className="content">{children}</div>
      </dialog>
    </div>
  );
};

export default Dialog;
