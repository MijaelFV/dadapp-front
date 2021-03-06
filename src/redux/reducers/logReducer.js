import { types } from "../types";
const initialState = {
    totalPages: 1,
    areaLogs: [],
    userLogs: [],
    itemLogs: [],
}

export const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.logSetTotalPages: 
            return {
                ...state,
                totalPages: action.payload
            }

        case types.logAreaLoad: 
            return {
                ...state,
                areaLogs: action.payload
            }

        case types.logUserLoad: 
            return {
                ...state,
                userLogs: action.payload
            }

        case types.logItemLoad: 
            return {
                ...state,
                itemLogs: action.payload
            }
        
        case types.logClear:
            return {
                ...initialState
            }

        default:
            return state;
    }
}