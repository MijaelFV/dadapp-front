import { combineReducers } from "redux";
import { areaReducer } from "./areaReducer";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";
import { invReducer } from "./invReducer";
import { itemReducer } from "./itemReducer";
import { logReducer } from "./logReducer";
import { searchReducer } from "./searchReducer";
import { spaceReducer } from "./spaceReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    space: spaceReducer,
    ui: uiReducer,
    inv: invReducer,
    log: logReducer,
    area: areaReducer,
    search: searchReducer,
    user: userReducer,
    item: itemReducer
})