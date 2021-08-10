import axios from './../helpers/axios'
import { catagoryConstants, productConstants } from './authConstants';
export const initialData = () => {
    return async (dispatch) => {
        const res = await axios.post('/initialdata')
        if (res.status === 200) {
            const { products, catagories } = res.data;
            dispatch({
                type: catagoryConstants.CATAGORY_LIST_SUCCESS,
                payload: {
                    catagoryList: catagories
                }
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products,
                },
            })
        }
    }
}