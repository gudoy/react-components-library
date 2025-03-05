import { type ReactNode } from 'react';

import './Page.scss';

type PageProps = {
  title?: string;
  className?: string;
  children?: ReactNode;
};

function Page(props: PageProps) {
  const { title, className, children } = props;

  const classNames = `page ${className || ''}`.replace(/\s+/g, ' ').trim();

  return (
    <div className={classNames}>
      {title && <title>{title}</title>}
      {children}
    </div>
  );
}

export default Page;
