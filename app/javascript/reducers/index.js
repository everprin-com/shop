import { combineReducers } from "redux"

import user from "./user"
import card from "./card"
import product from "./product"
import orderform from "./orderform"

export default combineReducers({
    user,
    card,
    product,
    orderform,
})
