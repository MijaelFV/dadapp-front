import { types } from "../types/types";
const initialState = {
    items: null
}

export const invReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.invLoad: 
            return {
                ...state,
                items: [...action.payload]
            }

        case types.invDelete: 
            return {
                ...state,
                items:  null
            }

        default:
            return state;
    }
}