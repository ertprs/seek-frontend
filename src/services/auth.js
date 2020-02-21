import { api } from './api';

export const isAuthenticated = () => !getToken() ? false : true;

export const getToken = () => {
    return localStorage.getItem('TOKEN');
}

export const login = async (email, password) => {
    try {
        const res = await api.post('/login', {
            email,
            password
        })

        console.log(res)
    } catch(error) {
        console.log(error)
    }
}

export const logout = () => {

}
export default { isAuthenticated, getToken, login, logout }