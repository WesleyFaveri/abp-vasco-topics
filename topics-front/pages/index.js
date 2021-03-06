import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Dialog } from 'primereact/dialog';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { isAuthenticated, login, registerUser } from '../services/auth-service';
import { useRouter } from 'next/router'
import { Toast } from 'primereact/toast';
import { isClientSide } from '../utils/application-utils';

export default function Landing() {

    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const router = useRouter();

    const topBarButtons = function() {
        if (isClientSide()) {
            if (isAuthenticated()) return (
                <Button label="Entrar" onClick={() => router.push('/home')}/>
            );
            return (
                <>
                    <Button label="Registrar-se" onClick={() => setRegister(true)} className="p-button-outlined" style={{ marginRight: '5px' }}/>
                    <Button label="Login" onClick={() => setLogin(true)}/>
                </>
            );
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Topics</title>
                <meta name="description" content="Compartilhe o que você quiser" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <main className={styles.main}>
                <Menubar id="top-bar" className="landing-menubar" style={{ borderBottomWidth: 0, position: 'fixed', width: '100%' }} end={topBarButtons} start={<img src="top-bar2.png" style={{ width: 80, margin: '0px 10px' }}/>}/>
                <div style={{ backgroundColor: '#f5f5f5', textAlign: 'center', paddingTop: 55 }}> 
                    <img src="img-banner.png" style={{ width: '80vw', maxWidth: 600 }}/>
                </div>
                <div className="p-grid" style={{ padding: 20 }}>
                    <div className="p-col-12">
                        <center>
                            <h1>Compartilhe o que quiser<span style={{ color: '#364f6b' }}>, sem interações</span></h1>
                        </center>
                    </div>
                    <div className="p-col-6">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="p-col-6">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <div className="p-grid" style={{ padding: 20, backgroundColor: '#364f6b' }}>
                    <div className="p-col-12">
                        <center>
                            <h1 style={{ color: 'white' }}>Últimos topics</h1>
                        </center>
                    </div>
                    <TopicCard/>
                    <TopicCard/>
                    <TopicCard/>
                    <TopicCard/>
                </div>
                <div className="p-grid" style={{ padding: 20, backgroundColor: '#2c2d2f' }}>
                    <div className="p-col-12">
                        <center>
                            <h1 style={{ color: 'white' }}>#tags em alta</h1>
                        </center>
                    </div>
                    <TagCard/>
                    <TagCard/>
                    <TagCard/>
                    <TagCard/>
                </div>
            </main>

            <footer className={styles.footer}>
                <div>Powered by <b>Wesleo</b></div>
            </footer>

            <RegisterModal visible={register} onHide={() => setRegister(false)}/>
            <LoginModal visible={login} onHide={() => setLogin(false)}/>
        </div>
    )
}

function LoginModal(props) {

    const toast = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const footer = (
        <div>
            <Button 
                disabled={!validationOk()} 
                label="Entrar" 
                icon="pi pi-check" 
                onClick={doLogin} 
                loading={loading}/>
            <Button label="Cancelar" icon="pi pi-times" onClick={props.onHide} />
        </div>
    );

    function validationOk() {
        return email.length && password.length;
    }

    function doLogin() {
        setLoading(true);
        login(email, password).then(() => {
            router.push('/home');
        }).catch(e => {
            setLoading(false);
            toast.current.show({
                severity:'error', 
                summary: 'Não foi possível realizar o login :(', 
                detail: e.response.data.message, 
                life: 3000
            });
        });
    }

    return (
        <Dialog 
            header="Entrar"
            visible={props.visible} 
            position="top-right" 
            onHide={props.onHide} 
            resizable={false} 
            draggable={false} 
            style={{ width: '100vw', maxWidth: '350px' }}
            footer={footer}>
            <div className="p-grid p-fluid">
                <div className="p-field p-col-12">
                    <label className="p-d-block">Username</label>
                    <div className="p-inputgroup">
                        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="p-field p-col-12">
                    <label className="p-d-block">Senha</label>
                    <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </Dialog>
    );
}

function RegisterModal(props) {

    const toast = useRef(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const footer = (
        <div>
            <Button 
                disabled={!validationOk()} 
                label="Registrar" 
                icon="pi pi-check" 
                onClick={props.onHide} 
                loading={loading}
                onClick={doRegister}/>
            <Button label="Cancelar" icon="pi pi-times" onClick={props.onHide} />
        </div>
    );

    function validationOk() {
        if (!name || !lastName || !email || !password || !passwordConfirm) {
            return false;
        }
        if (!name.length || !lastName.length || !email.length || !password.length || !passwordConfirm.length) {
            return false;
        }
        if (passwordConfirm !== password) {
            return false;
        }
        return true;
    }

    function doRegister() {
        setLoading(true);
        registerUser({
            name,
            surname: lastName,
            email,
            password
        }).then(() => {
            router.push('/home');
        }).catch(e => {
            setLoading(false);
            toast.current.show({
                severity:'error', 
                summary: 'Não foi possível realizar o cadastro :(', 
                detail: e.response.data.message, 
                life: 3000
            });
        });
    }

    return (
        <Dialog 
            header="Registre-se"
            visible={props.visible} 
            position="top-right" 
            onHide={props.onHide} 
            resizable={false} 
            draggable={false} 
            style={{ width: '100vw', maxWidth: '700px' }}
            footer={footer}>
            <div className="p-grid p-fluid">
                <div className="p-field p-col-12 p-md-6">
                    <label className="p-d-block">Nome</label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label className="p-d-block">Sobrenome</label>
                    <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label className="p-d-block">Email</label>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label className="p-d-block">Senha</label>
                    <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label className="p-d-block">Verifique sua senha</label>
                    <InputText type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>
            </div>
            <Toast ref={toast} position="bottom-right"/>
        </Dialog>
    );
}

function TopicCard() {
    return (
        <div className="p-col">
            <Card title="Lorem ipsum" subTitle={<Chip icon="pi pi-user" label="@loremipsum" />}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Card>
        </div>
    );
}

function TagCard() {
    return (
        <div className="p-col">
            <Card title="#lorem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Card>
        </div>
    );
}