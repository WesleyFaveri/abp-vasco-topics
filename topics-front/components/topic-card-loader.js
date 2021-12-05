import { Card } from "primereact/card";
import { Skeleton } from 'primereact/skeleton';

export default function TopicCardLoader() {
    const cardTitle = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton size="3rem" className="p-mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" className="p-mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
    );

    return (
        <Card title={cardTitle} className="card-topic">
            <div>
                <Skeleton className="p-mb-2"></Skeleton>
                <Skeleton className="p-mb-2"></Skeleton>
                <Skeleton className="p-mb-2"></Skeleton>
                <Skeleton width="10rem" className="p-mb-2"></Skeleton>
            </div>
        </Card>
    )
}