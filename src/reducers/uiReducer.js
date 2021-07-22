import { types } from "../types/types";

const initialState = {
    modalIsOpen: false,
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
    
        default:
            return state;
    }

}