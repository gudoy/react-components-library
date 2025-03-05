import { memo, useCallback } from 'react';

import MainNavItem from '@/components/ui/layout/header/mainNav/item/MainNavItem';
import HomeIcon from '@/components/ui/icons/navigation/HomeIcon';
import UserIcon from '@/components/ui/icons/navigation/UserIcon';
import LogoutIcon from '@/components/ui/icons/navigation/LogoutIcon';

import AccountNavList from './lists/AccountNavList';
import MainNavList from './lists/MainNavList';

import './MainNav.scss';

const MainNav = () => {

    const handleMainNavClick = useCallback(() => {
        // Hide the side menu when a link is clicked (only necessary for mobile)
        document.getElementById('header')?.classList.remove('is-open');
    }, []);

    return (
        <nav className="nav main-nav" id="main-nav" onClick={handleMainNavClick}>
            <MainNavList>
                <MainNavItem icon={<HomeIcon />} label={'Home'} name="home" to="/" />
                <MainNavItem icon={<HomeIcon />}  label={'Page 1'} name="page-1" to="/page1" />
                <MainNavItem icon={<HomeIcon />}  label={'Page 2'} name="page-2" to="/page1" />
                <MainNavItem icon={<HomeIcon />}  label={'Page 3'} name="page-3" to="/page3" />
                <MainNavItem icon={<HomeIcon />}  label={'Page 4'} name="page-4" to="/page4" />
                <MainNavItem icon={<HomeIcon />}  label={'Page 5'} name="page-5" to="/page5" />
            </MainNavList>
            <AccountNavList>
                <MainNavItem icon={<UserIcon />} label={'Account'} to="/account" />
                <MainNavItem icon={<LogoutIcon />} label={'Logout'} to="/logout" />
            </AccountNavList>
        </nav>
    );
};

export default memo(MainNav);
