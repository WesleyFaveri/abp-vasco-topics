import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';

export default function TopicCard() {

    const cardSubtitle = (
        <Chip label="nomeusuario" image="avatar.svg" className="p-mr-2 p-mb-2" />
    );

    const cardFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tag value="10" icon="pi pi-heart"></Tag>
        </div>
    )

    return (
        <Card title="Título" subTitle={cardSubtitle} className="card-topic" footer={cardFooter}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Pellentesque congue lorem id ipsum scelerisque maximus. 
            Ut <span className="hash-tag">#vehicula</span> ultrices dolor, at varius ipsum vehicula at. 
            Vestibulum id urna at ante euismod vestibulum. 
            In semper lobortis erat, non pellentesque nisi hendrerit sit amet. 
            Proin ullamcorper mi a rutrum pretium.
        </Card>
    )
}