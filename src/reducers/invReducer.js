import { types } from "../types/types";
const initialState = {
    items: [],
    categories: []
}

export const invReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.invLoad: 
            return {
                ...state,
                items: [...action.payload]
            }

        case types.invAdd: 
            return {
                ...state,
                items: [...state.items, action.payload]
            }

        case types.invDelete: 
            return {
                ...state,
                items:  null
            }

        case types.invLoadCategories:
            return {
                ...state,
                categories: [...action.payload]
            }

        default:
            return state;
    }
}