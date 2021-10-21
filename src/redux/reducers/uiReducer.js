import { types } from "../types";

const initialState = {
    modalIsOpen: null,
    isLoading: false,
    navValue: "home"
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiLoadingStart:
            return {
                ...state,
                isLoading: true
            }

        case types.uiLoadingFinish:
            return {
                ...state,
                isLoading: false
            }

        case types.uiOpenModal:
            return {
                ...state,
                modalIsOpen: action.payload
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalIsOpen: null
            }

        case types.uiSetNavValue:
            return {
                ...state,
                navValue: action.payload
            }

        case types.uiClear:
            return {
                ...initialState
            }
    
        default:
            return state;
    }

}