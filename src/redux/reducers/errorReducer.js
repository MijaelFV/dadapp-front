import { types } from "../types";
const initialState = {
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.errorLoad:
            return {
                ...state,
                ...action.payload
            }

        case types.errorClear:
            return {
                ...initialState
            }

        default:
            return state;
    }
}