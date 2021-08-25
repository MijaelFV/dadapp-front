import { types } from "../types";

const initialState = {
    spaces: [],
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

        case types.spaceClear:
            return {
                ...initialState
            }
    
        default:
            return state;
    }
}