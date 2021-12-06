import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';
import { useEffect, useState } from 'react';
import { isClientSide } from '../../utils/application-utils';
import TopicCardLoader from '../../components/topic-card-loader';
import TopicCard from '../../components/topic-card';
import { useRouter } from 'next/router'
import { getAllTopicsFromUser } from '../../services/topics-service';
import { getUserById } from '../../services/user-service';
import Loader from '../../components/loader';

const tabItens = [
    {label: 'Topics'},
    {label: 'Fotos'},
    {label: 'Vídeos'}
];

export default function UserPage() {

    const router = useRouter();
    const [user, setUser] = useState();
    const { id } = router.query;

    useEffect(() => {
        if (isClientSide()) {
            getUserById(id).then(u => setUser(u));
        }
    }, []);

    if (!user) {
        return <Loader/>
    }

    return (
        <div className="default-layout">
            <div className="page-content">
                <Content user={user}/>
            </div>
            <Sidebar/>
        </div>
    );
}

function Content({ user }) {
    return (
        <>
            <div style={{ backgroundColor: '#ccc', height: 200, display: 'flex', alignItems: 'flex-end' }}>
                <Avatar image="/avatar.svg" style={{ width: 100, height: 100, marginLeft: 10 }}/>
                <div style={{ margin: 10, fontSize: 25 }}>
                    {user.name} {user.surname}
                </div>
            </div>
            <TabMenu className="content-tab" model={tabItens} />
            <Topics/>
        </>
    )
}

function Sidebar() {
    return (
        <div className="sidebar-content">
            <div className="session">
                <small>QUEM SEGUIR</small>
            </div>
            <div className="user">
                <Avatar size="large" image="/avatar.svg" shape="circle"/>
                <div>Leonardo</div>
            </div>
            <div className="user">
                <Avatar size="large" image="/avatar.svg" shape="circle"/>
                <div>Leonardo</div>
            </div>
        </div>
    );
}

function Topics() {

    const router = useRouter();
    const [topics, setTopics] = useState();
    const [count, setCount] = useState(0);
    const { id } = router.query;

    useEffect(() => {
        loadTopics();
    }, []);

    function loadTopics() {
        setTopics(null);
        getAllTopicsFromUser(id).then(response => {
            setTopics(response.topics);
            setCount(response.count);
        });
    }

    function ListTopics() {
        if (!topics) {
            return <TopicCardLoader/>
        }

        return topics.map(t => (
            <>
                <TopicCard id={t.id} content={t.content} title={t.title} user={t.User} isMine={t.isMine}/>
                <br/>
            </>
        ));
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                <ListTopics/>
            </div>
        </>
    );
}