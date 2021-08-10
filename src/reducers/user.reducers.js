import { userConstants } from "../actions/authConstants"

const initial_state = {
    authenticating: false,
    message: '',
    error: ''
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case userConstants.SINGUP_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case userConstants.SINGUP_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                authenticating: false,
                error: ''
            }
            break;
        case userConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticating: false
            }
            break
    }
    console.log(state)
    return state;
}