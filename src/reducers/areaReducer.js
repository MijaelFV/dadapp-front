import { types } from "../types/types";
const initialState = {
    areas: [],
    active: null
}

export const areaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.areaLoad:
            return {
                ...state,
                areas: [...action.payload]
            }

        case types.areaActive:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state;
    }
}