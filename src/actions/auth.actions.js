import { authConstant } from "./authConstants"
//
import axios from '../helpers/axios'
export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
        const res = await axios.post('/admin/signin', {
            email: user.email,
            password: user.password
        })
        dispatch({
            type: authConstant.LOGIN_REQUEST,
            payload: {
                authenticating: true
            }
        })
        if (res.status == 200) {
            const { token, user } = res.data;
            //setting them in local storage to use them after user login...
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                    authenticating: false,
                    authenticate: true,
                }
            })
        } else {
            if (res.status == 400) {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: res.error
                })
            }
        }

    }
}

export const keepUserLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = localStorage.getItem('user');
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                    authenticating: false,
                    authenticate: true,
                }
            })
        }
    }
}

export const signOut = () => {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        dispatch({
            type: authConstant.SIGNOUT_REQUEST
        })
        const res = await axios.post('/admin/signout')
        if (res.status == 200) {
            localStorage.clear()
            dispatch({
                type: authConstant.SIGNOUT_SUCCESS,
            })
        } else {
            if (res.status == 400) {
                dispatch({
                    type: authConstant.SIGNOUT_FAILURE,
                    payload: res.data.error
                })
            }
        }

    }
}