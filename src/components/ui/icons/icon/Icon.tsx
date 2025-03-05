import { PropsWithChildren } from 'react';

import './Icon.scss';

type IconProps = PropsWithChildren;

function Icon(props: IconProps) {
  const { children } = props;

  return <span className="icon">{children}</span>;
}

export default Icon;
