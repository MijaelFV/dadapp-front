import { types } from "../types/types";

const initialState = {
    modalIsOpen: null,
    navValue: "home"
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
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
    
        default:
            return state;
    }

}