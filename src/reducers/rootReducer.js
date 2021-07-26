import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { invReducer } from "./invReducer";
import { spaceReducer } from "./spaceReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    space: spaceReducer,
    ui: uiReducer,
    inv: invReducer
})