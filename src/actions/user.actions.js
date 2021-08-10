import axios from './../helpers/axios'
import { userConstants } from './authConstants'
export const signUp = (user) => {
    console.log(user)
    return async (dispatch) => {
        const res = await axios.post('/admin/signup', {
            ...user
        })
        dispatch({
            type: userConstants.SINGUP_REQUEST,
        })
        if (res.status == 200) {
            const { message } = res.data
            dispatch({
                type: userConstants.SINGUP_SUCCESS,
                payload: {
                    message
                }
            })
        } else {
            if (res.status == 400) {
                dispatch({
                    type: userConstants.SIGNUP_FAILURE,
                    payload: res.data.error
                })
            }
        }
    }
}