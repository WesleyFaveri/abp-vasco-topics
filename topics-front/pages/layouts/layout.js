import { useEffect, useRef, useState } from "react";
import Head from 'next/head'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel';
import { isAuthenticated, loggedUser, logout } from "../../services/auth-service";
import { isClientSide } from "../../utils/application-utils";
import { useRouter } from "next/router";
import { Avatar } from 'primereact/avatar';
import { TabMenu } from 'primereact/tabmenu';
import { Menu } from 'primereact/menu';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

export default function Layout({ children }) {

    const router = useRouter();
    const [user, setUser] = useState();

    useEffect(() => {
        if (isClientSide()) {
            if (!isAuthenticated()) {
                router.push('/');
                return;
            }
            loggedUser().then(u => setUser(u));
        }
    }, []);

    return (
        <div id="layout-screen">
            <LateralMenu user={user}/>
            <div id="layout-container">
                <TopBar/>
                <div id="layout-content-container">
                    { children }
                </div>
            </div>
        </div>
    );
}

function LateralMenu({ user }) {

    const router = useRouter();

    let menuItems = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command: () => router.push('/home')},
        {label: 'Tags', icon: 'pi pi-fw pi-tag'},
        {label: 'Descobrir', icon: 'pi pi-fw pi-globe'},
        {label: 'Perfil', icon: 'pi pi-fw pi-user', command: () => router.push('/users/' + user.id)},
    ];

    function Top() {
        if (!user) {
            return (
                <>
                    <div style={{ width: 10 }}></div>
                    <Skeleton size="3rem" className="p-mr-2"></Skeleton>
                    <Skeleton width="10rem" className="p-mb-2"></Skeleton>
                </>
            );
        }
        return (
            <>
                <Avatar image="/avatar.svg" size="large"/>
                <div className="username">{user.name}</div>
            </>
        );
    }

    return (
        <div id="lateral-menu">
            <div className="top">
                <Top/>
            </div>
            <div className="middle">
                <div className="button first">
                    <div className="value">480</div>
                    <div className="label">Topics</div>
                </div>
                <div className="button">
                    <div className="value">480</div>
                    <div className="label">Topics</div>
                </div>
            </div>
            <div className="bottom">
                <Menu model={menuItems} />
            </div>
        </div>
    )
}

function TopBar() {

    const op = useRef(null);

    return (
        <>
            <div id="layout-top-bar">
                <div id="top-bar-logo">
                    <img src="/top-bar2.png" style={{ height: 30 }}/>
                </div>
                <div className="top-bar-buttons">
                    <div>
                        <i className="pi pi-search"/>
                    </div>
                    <div onClick={(e) => op.current.toggle(e)}>
                        <i className="pi pi-cog"/>
                    </div>
                </div>
            </div>
            <OverlayPanel 
                ref={op} 
                id="overlay_panel"
                className="overlaypanel-demo">
                <div>
                    <Button onClick={() => logout()}>Sair</Button>
                </div>
            </OverlayPanel>
        </>
    );
}