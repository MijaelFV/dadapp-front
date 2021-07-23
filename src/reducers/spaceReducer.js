import { types } from "../types/types";

const initialState = {
    spaces: null,
    active: null
}

export const spaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.spaceActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.spaceLoad:
            return {
                ...state,
                spaces: [...action.payload]
            }

        case types.spaceAdd:
            return {
                ...state,
                spaces: [...state.spaces, action.payload]
            }

        case types.spaceDelete:
            return {
                ...state,
                spaces: state.spaces.filter(
                    space => (space.uid !== action.payload)
                ),
            }
    
        default:
            return state;
    }
}