import { type ReactNode, type MouseEvent, type ComponentProps } from 'react';

import Label from '@/components/ui/label/Label';
import Loader from '@/components/ui/states/loading/Loader';

import './Button.scss';

export type TooltipPosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right';

export type ButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  isLoading?: boolean;
  onClick?: (event: MouseEvent) => void;
  preventDefault?: boolean;
  type?: 'button' | 'submit' | 'reset';
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
};

export type CustomButtonType = ButtonProps & (ComponentProps<'button'> | ComponentProps<'a'>);

function Button(props: CustomButtonType) {
  const {
    href,
    label,
    children,
    className,
    disabled,
    icon,
    isLoading,
    onClick,
    preventDefault,
    type = 'button',
    tooltip,
    tooltipPosition,
    ...otherProps
  } = props;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (preventDefault) {
      event.preventDefault();
    }
    onClick?.(event);
  };

  const classNames = `action ${isLoading ? 'is-loading' : ''} ${className || ''}`.replace(/\s{2,}/g, ' ');
  const isDisabled = disabled || isLoading;

  const isLink = !!href;
  const Tag = isLink ? 'a' : 'button';

  return (
    // @ts-expect-error: fix type properly
    <Tag
      className={classNames}
      data-tooltip={tooltip}
      data-tooltip-position={tooltip ? tooltipPosition || 'bottom center' : undefined}
      disabled={isDisabled || isLoading}
      href={href}
      type={isLink ? undefined : type}
      onClick={handleClick}
      {...otherProps}
    >
      {icon && icon}
      {label && <Label value={label} />}
      {children}
      {isLoading && <Loader />}
    </Tag>
  );
}

export default Button;
