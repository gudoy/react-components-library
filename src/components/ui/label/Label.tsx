import { ReactNode } from 'react';

type LabelProps = {
  value?: string | number | ReactNode;
  children?: ReactNode;
};

function Label(props: LabelProps) {
  const { children, value } = props;

  return (
    <span className="label">
      {typeof value !== 'undefined' ? value : undefined}
      {children}
    </span>
  );
}

export default Label;
