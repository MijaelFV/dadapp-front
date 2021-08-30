import { types } from "../types";
const initialState = {
    items: [],
    toReturn: [],
    categories: []
}

export const invReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.invLoad: 
            return {
                ...state,
                items: [...action.payload]
            }

        case types.invUnload: 
            return {
                ...state,
                items: []
            }

        case types.invLoadToReturn: 
            return {
                ...state,
                toReturn: [...action.payload]
            }

        case types.invRemoveToReturn: 
            return {
                ...state,
                toReturn: state.toReturn.filter(
                    item => (item.uid !== action.payload)
                ),
            }

        case types.invLoadToReturn: 
            return {
                ...state,
                toReturn: [...action.payload]
            }

        // case types.invAdd: 
        //     return {
        //         ...state,
        //         items: [...state.items, action.payload]
        //     }

        case types.invRemove: 
            return {
                ...state,
                items: state.items.filter(
                    item => (item.uid !== action.payload)
                ),
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

        case types.invClear:
            return {
                ...initialState
            }

        default:
            return state;
    }
}