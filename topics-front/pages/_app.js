import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Layout from './layouts/layout';

function MyApp({ Component, pageProps }) {
    
    if (Component.name === 'Landing') {
        return (
            <Component {...pageProps} />
        );
    }

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp
