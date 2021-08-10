import axios from 'axios'
import { authConstant } from '../actions/authConstants'
import store from './../store/index'
const token = localStorage.getItem('token')
const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        "Authorization": token ? `Bearer ${token}` : ''
    }
})
instance.interceptors.request.use((req) => {
    const { token } = store.getState().auth
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})
instance.interceptors.response.use((res) => {
    return res
}, (error) => {
    const status = error.response ? error.response.status : 500;
    if (status == 500 || status == 400) {
        localStorage.clear();
        store.dispatch({
            type: authConstant.SIGNOUT_SUCCESS,
        })
    }
    return Promise.reject(error)
})
export default instance;