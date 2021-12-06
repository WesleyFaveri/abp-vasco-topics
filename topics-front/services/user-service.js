import api from "./api";

export const getUserById = (id) => {
    return api.get('/v1/users/' + id).then(res => {
        return res.data;
    });
}