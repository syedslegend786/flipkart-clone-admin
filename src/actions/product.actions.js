import { productConstants } from "./authConstants"
//
import axios from './../helpers/axios'
import { initialData } from './initialData.actions'
export const createProduct = (form) => {
    return async (dispatch) => {
        dispatch({
            type: productConstants.CREATE_PRODUCT_REQUEST,
        })
        const res = await axios.post('/product/create', form)
        if (res.status == 200) {
            const { product } = res.data;
            dispatch({
                type: productConstants.CREATE_PRODUCT_SUCCESS,
                payload: {
                    product: product,
                }
            })
            dispatch(initialData())
        } else {
            dispatch({
                type: productConstants.CREATE_PRODUCT_FAILURE,
                payload: res.data.error
            })
        }
    }
}


export const deleteProductAction = (payload) => {
    return async (dispatch) => {
        const res = await axios.post(`/admin/product/delete`, {
            ...payload,
        })
        if (res.status === 200) {
            dispatch(initialData())
        }
    }
}