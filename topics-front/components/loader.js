import { ProgressSpinner } from 'primereact/progressspinner';

export default function Loader() {
    return (
        <div style={{ display: 'flex', alignContent: 'center' }}>
            <ProgressSpinner style={{ width: '50px', height: '50px' }}/>
        </div>
    );
}