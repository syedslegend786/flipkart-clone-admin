import axios from './../helpers/axios'
import { pageConstants } from './authConstants'


export const createPageAction = (form) => {
    return async (dispatch) => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST, })
        try {
            const res = await axios.post('/page/create', form);
            if (res.status === 200) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: res.data.page,
                })
                console.log(res.data.page)
            } else {
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    error: res.data.error,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}