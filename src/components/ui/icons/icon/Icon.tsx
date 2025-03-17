import { PropsWithChildren } from 'react';

import './Icon.scss';

export type IconProps = PropsWithChildren<{
  className?: string;
}>;

function Icon(props: IconProps) {
  const { children, className } = props;

  const classnames = `icon ${className}`.trim();

  return (
    <span className={classnames}>{children}</span>
  );
}

export default Icon;
