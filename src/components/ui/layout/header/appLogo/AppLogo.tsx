import Link from '@/components/ui/navigation/Link/Link';

import './AppLogo.scss'

function AppLogo() {
    return (
        <Link className="logo app-logo" href="/home">
            <img src="https://placehold.co/150x150/png?text=Your+Logo" width={150} height={150} alt={'Your Logo'} />
        </Link>
    );
}

export default AppLogo;