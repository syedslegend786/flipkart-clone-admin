import { orderConstants } from "../actions/authConstants"

const initial_state = {
    orders: [],
    loading: false,
    error: ''
}


export default (state = initial_state, action) => {
    switch (action.type) {
        case orderConstants.GET_ALL_ORDERS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case orderConstants.GET_ALL_ORDERS_SUCCESS:
            state = {
                ...state,
                loading: false,
                orders: action.payload,
            }
            break;
        case orderConstants.GET_ALL_ORDERS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break
    }
    return state;
}