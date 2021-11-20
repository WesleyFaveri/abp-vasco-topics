import { useState } from "react";
import Head from 'next/head'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';


export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>@usuario - Topics</title>
                <meta name="description" content="Compartilhe o que você quiser" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <TopBar/>
            <div style={{ height: 54 }}></div>
            {children}
        </>
    );
}

function TopBar() {

    const endButtons = function() {
        return (
            <>
                <Button icon="pi pi-bell" className="p-button-rounded" style={{ marginRight: 10 }}/>
                <Avatar image="avatar.svg" shape="circle" onClick={() => alert('oi')}/>
            </>
        );
    }

    const start = function() {
        return (
            <>
                <img src="top-bar.png" style={{ width: 30, margin: '0px 10px' }}/>
                <Button 
                    className="p-button-raised" 
                    icon="pi pi-plus" 
                    label="New Topic"
                    style={{ marginLeft: 10 }}></Button>
            </>
        );
    }

    return (
        <Menubar id="top-bar" start={start} end={endButtons}/>
    );
}