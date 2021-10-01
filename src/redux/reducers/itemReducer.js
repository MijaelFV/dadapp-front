import { types } from "../types";

const initialState = {}

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.itemLoad:
            return {
                ...state,
                ...action.payload
            }

        case types.itemClear:
            return {
                ...initialState
            }
    
        default:
            return state;
    }
}