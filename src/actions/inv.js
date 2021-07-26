import { types } from "../types/types";
import { fetch } from "../helpers/axios";

export const loadInventory = (inventory) => ({
    type: types.invLoad,
    payload: inventory
})

export const deleteInventory = () => ({
    type: types.invDelete,
})

export const getInventoryBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/inventories/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadInventory(resp.data.inventory))
        } else {
            console.log(resp.data)
        }
    }
}

