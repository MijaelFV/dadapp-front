import { types } from "../types";
const initialState = {
    checking: true,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish: 
            return {
                ...state,
                checking: false
            }

        case types.authLogOut:
            return {
                ...initialState
            }

        default:
            return state;
    }
}