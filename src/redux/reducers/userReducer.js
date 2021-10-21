import { types } from "../types";

const initialState = {}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userLoad:
            return {
                ...state,
                ...action.payload
            }

        case types.userClear:
            return {
                ...initialState
            }
    
        default:
            return state;
    }
}