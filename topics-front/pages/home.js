import { Avatar } from 'primereact/avatar';
import { TabMenu } from 'primereact/tabmenu';
import { Menu } from 'primereact/menu';
import { Card } from 'primereact/card';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createTopic, getAllTopics } from '../services/topics-service';
import Loader from '../components/loader';
import TopicCard from '../components/topic-card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import TopicCardLoader from '../components/topic-card-loader';
import TopicWriter from '../components/topic-writer';
import { VirtualScroller } from 'primereact/virtualscroller';

const tabItens = [
    {label: 'Topics'},
    {label: 'Fotos'},
    {label: 'Vídeos'}
];

export default function Home() {

    const contentRef = useRef();

    function onScroll(e) {
        const target = e.target;
        const loadMore = target.scrollTop + 200 > (target.scrollHeight - target.offsetHeight)
        if (loadMore) {
            contentRef.current.loadMore();
        }
    }

    return (
        <div className="default-layout">
            <div className="page-content" onScroll={onScroll}>
                <Content ref={contentRef}/>
            </div>
            <Sidebar/>
        </div>
    );
}

const Content = forwardRef((props, ref) => {

    const limit = 20;
    const [topics, setTopics] = useState();
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadTopics();
    }, []);

    useImperativeHandle(ref, () => ({
        loadMore() {
            if (!loading && hasMore) {
                loadTopics();
            }
        }
    }));

    function loadTopics() {
        setLoading(true);
        getAllTopics(limit, count).then(response => {
            if (topics) {
                if (!response.topics.length) {
                    setHasMore(false);
                    return;
                }
                setTopics(topics.concat(response.topics));
            } else {
                setTopics(response.topics);
            }
            setCount(count + response.topics.length);
        }).finally(() => setLoading(false));
    }

    function ListTopics() {
        if (!topics) {
            return <TopicCardLoader/>
        }

        return topics.map(t => (
            <>
                <TopicCard id={t.id} content={t.content} title={t.title} user={t.User}/>
                <br/>
            </>
        ));
    }

    return (
        <>
            <TabMenu className="content-tab" model={tabItens} /> 
            <div style={{ padding: 20 }}>
                <NewTopic onCreate={loadTopics}/>
                <br/>
                <ListTopics/>
                {loading ? <TopicCardLoader/> : <div/>}
            </div>
        </>
    );
});

function Sidebar() {
    return (
        <div className="sidebar-content">
            <div className="session">
                <small>QUEM SEGUIR</small>
            </div>
            <div className="user">
                <Avatar size="large" image="avatar.svg" shape="circle"/>
                <div>Leonardo</div>
            </div>
            <div className="user">
                <Avatar size="large" image="avatar.svg" shape="circle"/>
                <div>Leonardo</div>
            </div>
        </div>
    );
}

function NewTopic({ onCreate }) {

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    function buttonDisable() {
        return !content.trim().length || !title.trim().length;
    }

    function doCreateTopic() {
        setIsPosting(true);
        createTopic({
            title,
            content
        }).then(() => {
            setTitle('');
            setContent('');
            onCreate();
        }).finally(() => setIsPosting(false));
    }
    
    return (
        <Card title="Novo topic">
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    <InputText 
                        placeholder="Meu novo topic!"
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="p-col">
                    <TopicWriter text={content} onChange={(t) => setContent(t)}/>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    label="Postar" 
                    icon="pi pi-check" 
                    onClick={doCreateTopic} 
                    loading={isPosting}
                    disabled={buttonDisable()}/>
            </div>
        </Card>
    );
}