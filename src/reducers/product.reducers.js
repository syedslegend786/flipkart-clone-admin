import { productConstants } from "../actions/authConstants"

const initial_state = {
    name: '',
    description: '',
    catagory: '',
    quantity: '',
    productPictures: [],
    laoding: false,
    error: '',
    getAllProducts: [],
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case productConstants.CREATE_PRODUCT_REQUEST:
            state = {
                ...state,
                laoding: true,
            }
            break;
        case productConstants.CREATE_PRODUCT_SUCCESS:
            const p = action.payload.product;
            state = {
                ...state,
                name: p.name,
                description: p.description,
                catagory: p.catagory,
                quantity: p.quantity,
                productPictures: p.productPictures,
                laoding: false
            }
            break;
        case productConstants.CREATE_PRODUCT_FAILURE:
            state = {
                ...initial_state,
                error: action.payload.error
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                getAllProducts: action.payload.products,
                laoding: false,
            }
    }
    return state;
}