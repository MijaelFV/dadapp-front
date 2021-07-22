import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { spaceReducer } from "./spaceReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    space: spaceReducer,
    ui: uiReducer
})