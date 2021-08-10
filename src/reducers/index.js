import { combineReducers } from "redux";
import authReducer from './auth.reducers'
import userReducer from './user.reducers'
import catagoryReducer from './catagory.reducers'
import productReducer from './product.reducers'
import pageReducer from './page.reducers'
import orderReducer from './order.reducers'
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    catagory: catagoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
})
export default rootReducer