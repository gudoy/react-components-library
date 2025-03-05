import Link from '@/components/ui/navigation/Link/Link';

import './AppLogo.scss';

function AppLogo() {
  return (
    <div className="branding" id="branding">
      <Link className="logo app-logo" href="/">
        <img src="https://placehold.co/150x150/white/aaaaaa/svg?text=Logo" width={150} height={150} alt={'Logo'} />
      </Link>
    </div>
  );
}

export default AppLogo;
