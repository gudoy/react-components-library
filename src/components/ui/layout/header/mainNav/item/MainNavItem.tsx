import { type ReactNode } from 'react';

import Label from '@/components/ui/label/Label';
import Link from '@/components/ui/navigation/Link/Link';

import './MainNavItem.scss';

type NavItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
  name?: string;
  className?: string;
  target?: string;
  rel?: string;
};

const MainNavItem = (props: NavItemProps) => {
  const { to = '', name, className, icon, label, target, rel } = props;

  const isCurrent = location.pathname === to.replace(/\?.*/, '');

  const usedName = (name || to.replace(/^\//, '')).toLowerCase();
  const classNames =
    `nav-item main-nav-item lv1-item ${usedName}-nav-item ${className || ''} ${isCurrent ? 'is-current' : ''}`
      .replace(/\s+/g, ' ')
      .trim();
  const href = to.startsWith('http') ? location.pathname : to;

  return (
    <li className={classNames}>
      <Link data-tooltip={label} rel={rel} target={target} href={href}>
        {icon}
        <Label>{label}</Label>
      </Link>
    </li>
  );
};

export default MainNavItem;
