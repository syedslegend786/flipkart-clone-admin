import { authConstant } from "../actions/authConstants"

const initial_state = {
    token: null,
    user: null,
    authenticating: false,
    authenticate: false,
    error: '',
    loading: false,
    singouterror: ''
}

export default (state = initial_state, action) => {
    console.log(action)
    switch (action.type) {
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
            }
            break;
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: action.payload.authenticating,
            }
            break;
        case authConstant.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case authConstant.SIGNOUT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case authConstant.SIGNOUT_SUCCESS:
            state = {
                ...initial_state
            }
            break;
        case authConstant.SIGNOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                singouterror: action.payload.error
            }
            break;
    }
    return state;
}