import { types } from "../types/types";

const initialState = {
    modalIsOpen: false,
    navValue: "home"
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalIsOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalIsOpen: false
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