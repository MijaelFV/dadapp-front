import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadInventory = (inventory) => ({
    type: types.invLoad,
    payload: inventory
})

export const addToInventory = (inventory) => ({
    type: types.invAdd,
    payload: inventory
})

export const deleteInventory = () => ({
    type: types.invDelete,
})

export const clearInventory = () => ({
    type: types.invClear,
})

export const getInventoryBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventories/${spaceId}`);
        console.log(resp);
        if (resp.status === 200) {
            dispatch(loadInventory(resp.data.inventory))
        } else {
            console.log(resp.data)
        }
    }
}

export const createInventory = (item, row, column, space) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventories`, {item, row, column, space}, 'POST');
        console.log(resp)
        if (resp.status === 201) {
            dispatch(getInventoryBySpace(space));
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateObject = (name, description, category, row, column, space) => {
    return async(dispatch) => {
        const resp = await fetch(`api/items`, {name, description, category }, 'POST');
        if (resp.status === 201) {
            const {uid: item} = resp.data.newItem
            dispatch(createInventory(item, row, column, space))
        } else {
            console.log(resp.data)
        }
    }
}



