import api from "./api";

export function getAllTopics(limit, offset) {
    return api.get(`v1/topics?limit=${limit}&offset=${offset}`).then(res => res.data);
}

export function getAllTopicsFromUser(userId) {
    return api.get('v1/topics/user/' + userId).then(res => res.data);
}

export function createTopic(topic) {
    return api.post('v1/topics', topic).then(res => res.data);
}

export function saveTopic(id, topic) {
    return api.put('v1/topics/' + id, topic).then(res => res.data);
}

export function deleteTopic(topicId) {
    return api.delete('v1/topics/' + topicId);
}