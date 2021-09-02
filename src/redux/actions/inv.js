import { types } from "../types";
import { fetch } from "../../helpers/axios";

export const loadInventory = (inventory) => ({
    type: types.invLoad,
    payload: inventory
})

export const unloadInventory = () => ({
    type: types.invUnload,
})

// export const addToInventory = (item) => ({
//     type: types.invAdd,
//     payload: item
// })

export const loadToReturn = (inventory) => ({
    type: types.invLoadToReturn,
    payload: inventory
})

export const removeToReturn = (item) => ({
    type: types.invRemoveToReturn,
    payload: item
})

export const removeFromInventory = (item) => ({
    type: types.invRemove,
    payload: item
})

export const deleteInventory = () => ({
    type: types.invDelete,
})

export const clearInventory = () => ({
    type: types.invClear,
})

export const getItemById = (id) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/${id}`);
        if (resp.status === 200) {
            dispatch(loadInventory([resp.data]))
        } else {
            console.log(resp.data)
        }
    }
}

export const getInventoryByTaked = (areaId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/taked/${areaId}`);
        if (resp.status === 200) {
            dispatch(loadToReturn(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const getInventoryBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/inventory/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadInventory(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}
 
export const uploadItemImage = (item, image) => {
    return async(dispatch) => {
        const formData = new FormData();
        formData.append('file', image);
        const resp = await fetch(`api/upload/items/${item}`, formData, 'PUT');
        if (resp.status !== 200) {
            console.log(resp.data)
        }
    }
}

export const returnItem = (item, column, row, space, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/taked/return/${item}`, {row, column, space, area}, 'PUT');
        if (resp.status === 200) {
            dispatch(removeToReturn(item))
        } else {
            console.log(resp.data)
        }
    }
}

export const startModifyItem = (item, name, description, category, row, column, space, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/${item}`, {name, description, category, row, column, space, area}, 'PUT');
        if (resp.status === 200) {
            dispatch(getInventoryBySpace(space));
        } else {
            console.log(resp.data)
        }
    }
}

export const startRemoveItem = (item, area, type = 1) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/${item}`, {area, type}, 'DELETE');
        if (resp.status === 200) {
            dispatch(removeFromInventory(item));
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateItem = (name, description, category, row, column, space, area) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item`, {name, description, category, row, column, space, area}, 'POST');
        if (resp.status === 201) {
            dispatch(getInventoryBySpace(space));
        } else {
            console.log(resp.data)
        }
    }
}



