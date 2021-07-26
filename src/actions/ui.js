import { types } from "../types/types";

export const closeModal = () => ({
    type: types.uiCloseModal
})

export const openModal = () => ({
    type: types.uiOpenModal
})

export const setNavValue = (navValue) => ({
    type: types.uiSetNavValue,
    payload: navValue
})