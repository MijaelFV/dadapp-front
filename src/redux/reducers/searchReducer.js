import { types } from "../types";
const initialState = {
    items: {
        docs: [],
        totalPages: 0
    },
    users: {
        docs: [],
        totalPages: 0
    },
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.searchLoad: 
            return {
                ...state,
                ...action.payload
            }

        case types.searchClear:
            return {
                ...initialState
            }

        default:
            return state;
    }
}