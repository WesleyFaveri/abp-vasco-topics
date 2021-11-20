import Link from 'next/link'
import { useState } from 'react';
import Layout from "./layouts/layout";
import TopicCard from '../components/topic-card';

export default function Home() {
    return (
        <div style={{ padding: 20 }}>
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <TopicCard/>
                </div>
            </div>
        </div>
    );
}