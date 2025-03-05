import { memo, useCallback } from 'react';

import AccountNavList from '@/components/ui/layout/header/mainNav/lists/AccountNavList';
import MainNavList from '@/components/ui/layout/header/mainNav/lists/MainNavList';

import HomeIcon from '@/components/ui/icons/navigation/HomeIcon';
import LogoutIcon from '@/components/ui/icons/navigation/LogoutIcon';
import PortfolioIcon from '@/components/ui/icons/navigation/PortfolioIcon';
import ShopIcon from '@/components/ui/icons/navigation/ShopIcon';
import StatsIcon from '@/components/ui/icons/navigation/StatsIcon';
import UserIcon from '@/components/ui/icons/navigation/UserIcon';
import MainNavItem from '@/components/ui/layout/header/mainNav/item/MainNavItem';
import SettingsIcon from '@/components/ui/icons/navigation/SettingsIcon';
import { useTranslation } from '@/utils/i18n';

import './MainNav.scss';

const MainNav = () => {
  const { t } = useTranslation();

  const handleMainNavClick = useCallback(() => {
    // Hide the side menu when a link is clicked (only necessary for mobile)
    document.getElementById('header')?.classList.remove('is-open');
  }, []);

  return (
    <nav className="nav main-nav" id="main-nav" onClick={handleMainNavClick}>
      <MainNavList>
        <MainNavItem icon={<HomeIcon />} label={t('Home')} name="home" to="/" />
        <MainNavItem icon={<StatsIcon />} label={t('Dashboard')} name="dashboard" to="/dashboard" />
        <MainNavItem icon={<ShopIcon />} label={t('Shop')} to="/shop" />
        <MainNavItem icon={<PortfolioIcon />} label={t('Portfolio')} to="/work" />
        <MainNavItem icon={<SettingsIcon />} label={t('Settings')} to="/settings" />
      </MainNavList>
      <AccountNavList>
        <MainNavItem icon={<UserIcon />} label={t('Account')} to="/account" />
        <MainNavItem icon={<LogoutIcon />} label={t('Logout')} to="/logout" />
      </AccountNavList>
    </nav>
  );
};

export default memo(MainNav);
