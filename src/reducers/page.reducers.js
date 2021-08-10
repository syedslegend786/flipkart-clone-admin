import { pageConstants } from "../actions/authConstants"

const initial_data = {
    page: {},
    loading: false,
    error: '',
}

export default (state = initial_data, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                loading: false,
            }
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
    }
    return state;
}