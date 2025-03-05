import MainNav from '@/components/ui/layout/header/mainNav/MainNav';
import AppLogo from '@/components/ui/layout/header/appLogo/AppLogo';

import './Header.scss';

const Header = () => {
    return (
        <header className="header" id="header">
            <AppLogo />
            <MainNav />
        </header>
    );
};

export default Header;
