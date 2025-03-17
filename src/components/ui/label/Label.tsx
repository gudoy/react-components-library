import type { PropsWithChildren, ReactNode } from 'react';

type LabelProps = PropsWithChildren<{
  value?: string | number | ReactNode;
}>;

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
