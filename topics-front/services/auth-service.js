import api from "./api";

export const TOKEN_KEY = "@topics-api-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (username, password) => {
    return api.post('/v1/auth/login', { email: username, password: password }).then(res => {
        localStorage.setItem(TOKEN_KEY, res.data.token);
    });
};

export const registerUser = (user) => {
    return api.post('/v1/auth/register', user).then(res => {
        localStorage.setItem(TOKEN_KEY, res.data.token);
    });
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location = window.location.origin
};

export const loggedUser = () => {
    return api.get('/v1/auth/me').then(res => {
        return res.data.user;
    });
}