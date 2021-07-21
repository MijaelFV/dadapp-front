import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { spaceReducer } from "./spaceReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    space: spaceReducer
})