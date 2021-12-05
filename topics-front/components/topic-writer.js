import { Mention } from 'primereact/mention';
import { useEffect, useState } from "react";

export default function TopicWriter({ onChange, text }) {

    const [sugestions, setSugestions] = useState([]);
    const [content, setContent] = useState(text);

    useEffect(() => {
        onChange(content);
    }, [content])

    function onSearch(event) {
        const query = event.query;

        if (query === 'leo') {
            setSugestions([query, 'leonardo']);
        } else {
            setSugestions([query]);
        }
    }

    return (
        <Mention 
            suggestions={sugestions} 
            onSearch={onSearch} 
            trigger={'#'}
            autoResize
            rows={5}
            value={text}
            onChange={e => setContent(e.target.value)}
            placeholder="O que você deseja compartilhar com o mundo?"/>
    );
}