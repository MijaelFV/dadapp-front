import { types } from "../types/types";
const initialState = {
    logs: [],
}

export const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.logLoad: 
            return {
                ...state,
                logs: [...action.payload]
            }

        default:
            return state;
    }
}