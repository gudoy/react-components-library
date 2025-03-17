import type { ReactNode } from 'react';

import './MainNavList.scss'

type MainNavListProps = {
    children: ReactNode
}

function MainNavList({ children }: MainNavListProps) {
    return (
        <ul className="nav-list main-nav-list">
            {children}
        </ul>
    );
};

export default MainNavList;