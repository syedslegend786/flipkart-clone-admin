import axios from './../helpers/axios'
import { catagoryConstants } from './authConstants';
import store from './../store/index'
import { initialData } from './initialData.actions';
//
// export const getAllCatagories = () => {
//     return async (dispatch) => {
//         dispatch({
//             type: catagoryConstants.CATAGORY_LIST_REQUEST,
//         })
//         const res = await axios.get('/catagory/getCatagory');
//         if (res.status == 200) {
//             const { catagoryList } = res.data;
//             dispatch({
//                 type: catagoryConstants.CATAGORY_LIST_SUCCESS,
//                 payload: {
//                     catagoryList
//                 }
//             })
//         } else {
//             dispatch({
//                 type: catagoryConstants.CATAGORY_LIST_FAILURE,
//                 payload: {
//                     error: res.data.error
//                 }
//             })
//         }
//     }
// }

export const createCatagoryAction = (form) => {
    return async (dispatch) => {
        dispatch({
            type: catagoryConstants.CREATE_CATAGORY_REQUEST,
        })
        const res = await axios.post('/catagory/create', form)
        if (res.status == 200) {
            const { catagory } = res.data
            dispatch({
                type: catagoryConstants.CREATE_CATAGORY_SUCCESS,
                payload: {
                    catagory: catagory,
                }
            })
        } else {
            dispatch({
                type: catagoryConstants.CREATE_CATAGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}
export const updateCatagoryAction = (form) => {
    return async (dispatch) => {
        dispatch({
            type: catagoryConstants.UPDATE_CATAGORY_REQUEST
        })
        const res = await axios.post('/catagory/update', form);
        if (res.status == 200) {
            dispatch({
                type: catagoryConstants.UPDATE_CATAGORY_SUCCESS,
            })
            store.dispatch(initialData());
        } else {
            dispatch({
                type: catagoryConstants.CATAGORY_LIST_FAILURE,
                error: res.data.error,
            })
        }
    }
}
export const deleteCatagoryAction = (ids) => {
    return async (dispatch) => {
        dispatch({
            type: catagoryConstants.DELETE_CATAGORY_REQUEST,
        })
        const res = await axios.post('/catagory/delete', {
            payload: ids
        })
        if (res.status == 200) {
            dispatch({
                type: catagoryConstants.DELETE_CATAGORY_SUCCESS
            })
            store.dispatch(initialData())
        } else {
            dispatch({
                type: catagoryConstants.DELETE_CATAGORY_FAILURE,
                payload: res.data.error,
            })
        }
    }
}