import axios from '../helpers/axios'
import { orderConstants } from './authConstants'
import store from './../store/index'
export const getOrdersActions = () => {
    return async (dispatch) => {
        dispatch({
            type: orderConstants.GET_ALL_ORDERS_REQUEST,
        })
        const res = await axios.get('/admin/getallorder')
        if (res.status === 200) {
            dispatch({
                type: orderConstants.GET_ALL_ORDERS_SUCCESS,
                payload: res.data.order,
            })
        } else {
            dispatch({
                type: orderConstants.GET_ALL_ORDERS_FAILURE,
                payload: res.data.error,
            })
        }
    }
}

export const handleOrderStatus = (payload) => {
    return async (dispatch) => {
        const res = await axios.post('/admin/orderstatus/update', {
            ...payload,
        })
        if (res.status === 200) {
            store.dispatch(getOrdersActions());
        }
        else {
            return false
        }
    }
}