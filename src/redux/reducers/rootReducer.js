import { combineReducers } from "redux";
import { areaReducer } from "./areaReducer";
import { authReducer } from "./authReducer";
import { invReducer } from "./invReducer";
import { logReducer } from "./logReducer";
import { searchReducer } from "./searchReducer";
import { spaceReducer } from "./spaceReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    space: spaceReducer,
    ui: uiReducer,
    inv: invReducer,
    log: logReducer,
    area: areaReducer,
    search: searchReducer
})