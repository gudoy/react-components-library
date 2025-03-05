import { useCallback, useLayoutEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react';
// import { useTranslation } from 'react-i18next'

import './Dialog.scss';

export type DialogProps = {
    isOpen: boolean;
    title?: ReactNode | string;
    onClose?: (event?: MouseEvent) => void;
    className?: string;
    modal?: boolean;
    children?: ReactNode;
    // TODO: The following 2 props to be removed. Use <Confirm> instead
    onConfirm?: () => void;
    buttonConfirmText?: string;
    innerRef?: RefObject<HTMLDivElement>;
    closeOnBackdropClick?: boolean;
};

const Dialog = (props: DialogProps) => {
    const {
        className = '',
        title,
        isOpen = false,
        modal = false, // TODO: Temporary setting to true for backward compatibility but this should be false by default
        onClose = () => undefined,
        // TODO: The following 2 props to be removed. Use <Confirm> instead
        onConfirm,
        children,
        buttonConfirmText,
        innerRef,
        closeOnBackdropClick = false,
    } = props;

    useLayoutEffect(() => {
        if (!innerRef?.current) {
            return;
        }

        const dialog = innerRef.current;
        dialog?.addEventListener('animationend', (event: AnimationEvent) => {
            if (event.animationName === 'closing-animation') {
                onClose();
            }
        });
    }, [innerRef, onClose]);

    const handleBackDropClick = useCallback(
        (event: MouseEvent) => {
            if (!closeOnBackdropClick) {
                return;
            }

            if (modal && !hasClickStartedOnContentRef.current) {
                onClose(event);
            } else {
                hasClickStartedOnContentRef.current = false;
            }
        },
        [modal, closeOnBackdropClick]
    );

    const handleClose = useCallback(
        (event: MouseEvent) => {
            // Trigger the closing animation.
            // Once the animation ends, the onClose callback will be called.
            innerRef?.current?.classList.contains('is-animated')
                ? innerRef?.current?.classList.add('is-closing')
                : onClose(event);
        },
        [onClose]
    );

    // TODO: The following 2 props to be removed. Use <Confirm> instead
    const handleConfirm = useCallback(() => {
        if (onConfirm) {
            onConfirm();
        }
    }, [onConfirm]);

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!closeOnBackdropClick) {
                return;
            }

            event.stopPropagation();
        },
        [closeOnBackdropClick]
    );

    // Note:
    // The following is kind a trick to properly handle the click 'outside' the dialog content
    // Basically, we need to know if the click started (mouseup) on the dialog content or not
    // If we do not do this and just listen for click on the container/backdrop and just prevent the event propagation
    // on click on the dialog content, then when we click on the dialog content and drag the mouse outside the dialog content
    // and release the mouse, the dialog will close, which is not the expected behavior.
    const hasClickStartedOnContentRef = useRef(false);
    const hasClickStartedOnContentTimeoutRef = useRef(0);

    const handleMouseUp = () => {
        hasClickStartedOnContentTimeoutRef.current = window.setTimeout(() => {
            hasClickStartedOnContentRef.current = false;
        });
    };

    const handleMouseDown = () => {
        window.clearTimeout(hasClickStartedOnContentTimeoutRef.current);
        hasClickStartedOnContentRef.current = true;
    };

    const classNames = ['dialog', isOpen ? 'is-open' : '', modal ? 'is-modal' : '', className]
        .filter(Boolean)
        .join(' ');

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
                        icon={<FaXmark />}
                        title={t('commonCloseActionLabel')}
                        onClick={handleClose}
                    />
                </header>

                <div className="content">{children}</div>
                {onConfirm && (
                    <div className="self-end">
                        <Button
                            className="confirm-action primary"
                            label={buttonConfirmText || t('modalDefaultOkValue')}
                            onClick={handleConfirm}
                        />
                    </div>
                )}
            </dialog>
        </div>
    );
};

export default Dialog;
