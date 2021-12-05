import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import ReactHtmlParser from 'react-html-parser'; 
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { deleteTopic, saveTopic } from '../services/topics-service';
import { Mention } from 'primereact/mention';

export default function TopicCard({ id, content, title, user }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [text, setText] = useState(content);
    const [editedText, setEditedText] = useState(content);
    const router = useRouter();

    useEffect(() => {
        if (!isEditMode) {
            setEditedText(text);
        }
    }, [isEditMode]);

    function doDeleteTopic() {
        setDeleting(true);
        deleteTopic(id).then(() => {
            setModalOpen(false);
            setDeleted(true);
        }).catch(() => {
            setDeleting(false);
        });
    }

    function doSave() {
        setSaving(true);
        saveTopic(id, {
            title: title,
            content: editedText
        }).then(() => {
            setText(editedText);
            setSaving(false);
            setEditMode(false);
        }).catch(() => setSaving(false));
    }

    if (deleted) {
        return (
            <Card>
                Excluído
            </Card>
        );
    }

    const cardFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tag value="10" icon="pi pi-heart"></Tag>
        </div>
    );

    const cardTitle = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar image="/avatar.svg" style={{ marginRight: 10, width: 32, flex: '0 0 32px' }}/>
            <div>
                <div style={{ lineHeight: '23px' }}>{title}</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', color: '#85898c' }}>
                    <a onClick={(e) => { router.push('/users/' + user.id); e.preventDefault() }}>
                        {user?.name} {user?.surname}
                    </a>
                </div>
            </div>
        </div>
    );

    const modalFooter = !isEditMode ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Button label="Editar" icon="pi pi-pencil" onClick={() => setEditMode(true)} />
                <Button label="Excluir" icon="pi pi-trash" loading={deleting} className="p-button-danger" onClick={doDeleteTopic} />
            </div>
            <div>
                <Button label="Fechar" icon="pi pi-times" onClick={() => setModalOpen(false)} />
            </div>
        </div>
    ) : (
        <div>
            <div>
                <Button label="Salvar" icon="pi pi-check" loading={saving} onClick={doSave} />
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setEditMode(false)} />
            </div>
        </div>
    );

    function CardContent() {
        if (isEditMode) return (
            <div className="p-grid p-fluid">
                <div className="p-col">
                    <Mention
                        rows={10}
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                        placeholder="O que você deseja compartilhar com o mundo?"/>
                </div>
            </div>
        );
        return tags(text);
    }

    return (
        <>
            <div onClick={() => setModalOpen(true)}>
                <Card title={cardTitle} className="card-topic clickable" footer={cardFooter}>
                    {tags(text)}
                    <div className="end"/>
                    <div className="end hover"/>
                </Card>
            </div>
            <Dialog draggable={false} header={cardTitle} visible={modalOpen} style={{ width: '60vw', maxHeight: '90vh' }} footer={modalFooter} onHide={() => setModalOpen(false)}>
                <CardContent/>
            </Dialog>
        </>
    )
}

function tags(text) {
    return ReactHtmlParser(
        text.split(' ')
        .map(s => s.startsWith('#') ? `<span class="hash-tag">${s}</span>` : s)
        .join(' ')
    );
}