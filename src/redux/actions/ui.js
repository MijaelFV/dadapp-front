import { types } from "../types";

export const closeModal = () => ({
    type: types.uiCloseModal
})

export const openModal = (id) => ({
    type: types.uiOpenModal,
    payload: id
})

export const setNavValue = (navValue) => ({
    type: types.uiSetNavValue,
    payload: navValue
})

export const clearUi = () => ({
    type: types.uiClear,
})