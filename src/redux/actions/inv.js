import { types } from "../types";
import { fetch } from "../../helpers/axios";

export const loadInventory = (inventory) => ({
    type: types.invLoad,
    payload: inventory
})

export const addToInventory = (inventory) => ({
    type: types.invAdd,
    payload: inventory
})

export const removeFromInventory = (inventory) => ({
    type: types.invRemove,
    payload: inventory
})

export const deleteInventory = () => ({
    type: types.invDelete,
})

export const clearInventory = () => ({
    type: types.invClear,
})

export const startRemoveObject = (item, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventory/${item}`, {area}, 'DELETE');
        console.log(resp);
        if (resp.status === 200) {
            dispatch(removeFromInventory(item));
        } else {
            console.log(resp.data)
        }
    }
}

export const getInventoryBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventory/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadInventory(resp.data.inventory))
        } else {
            console.log(resp.data)
        }
    }
}

export const createInventory = (item, row, column, space, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventory`, {item, row, column, space, area}, 'POST');
        if (resp.status === 201) {
            dispatch(getInventoryBySpace(space));
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateObject = (name, description, category, row, column, space, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item`, {name, description, category }, 'POST');
        if (resp.status === 201) {
            const {uid: item} = resp.data.newItem
            dispatch(createInventory(item, row, column, space, area))
        } else {
            console.log(resp.data)
        }
    }
}



