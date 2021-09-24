import { types } from "../types"

export const errorLoad = (errors) => ({
    type: types.errorLoad,
    payload: errors
})

export const errorClear = () => ({
    type: types.errorClear,
})