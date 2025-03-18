import type { ReactNode } from 'react';

type AccountListProps = {
  children: ReactNode;
};

const AccountNavList = ({ children }: AccountListProps) => {
  return <ul className="nav-list main-nav-list account-nav-list">{children}</ul>;
};

export default AccountNavList;
