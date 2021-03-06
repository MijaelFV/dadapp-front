import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { setLoadingFinish, setLoadingStart } from "./ui";
import imageCompression from 'browser-image-compression';
import { SwalMixin } from "../../components/SwalMixin";

export const setTotalPagesInventory = (totalPages) => ({
    type: types.invSetTotalPages,
    payload: totalPages
})

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

export const loadItem = (item) => ({
    type: types.itemLoad,
    payload: item
})

export const clearItem = () => ({
    type: types.itemClear,
})

export const getItemById = (id) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/${id}`);
        if (resp.status === 200) {
            dispatch(loadItem(resp.data))
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

export const getInventoryBySpace = (spaceid, page, limit = 10, row, col) => {
    return async(dispatch) => {
        dispatch(setLoadingStart())
        const resp = await fetch(`api/item/inventory/${spaceid}?page=${page}&limit=${limit}&row=${row}&column=${col}`);
        dispatch(setLoadingFinish())
        if (resp.status === 200) {
            dispatch(loadInventory(resp.data.docs))
            dispatch(setTotalPagesInventory(resp.data.totalPages))
        } else {
            console.log(resp.data)
        }
    }
}
 
export const uploadItemImage = (item, image) => {
    return async() => {
        if (image) {
            const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
            if (!supportedMimeTypes.includes(image.type)) {
                return SwalMixin.fire({
                    icon: "error",
                    titleText: "Se intento subir un archivo con extensi??n no soportada. Soportados: JPG, JPEG, PNG",
                    confirmButtonText: "aceptar"
                })
            }

            SwalMixin.fire({
                titleText: "Por favor espere mientras se sube el archivo al servidor.",
                icon: "info",
                showConfirmButton: false
            })
    
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1920,
            }
            const compressedFile = await imageCompression(image, options);
    
            const formData = new FormData();
            formData.append('file', compressedFile);
            const resp = await fetch(`api/upload/items/${item}`, formData, 'PUT');
    
            SwalMixin.close()
            if (resp.status !== 200) {
                console.log(resp.data)
            }
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

export const startModifyItem = (item, name, description, category, row, column, expiryDate, quantity, space, area, selectedFile) => {
    return async(dispatch) => {
        dispatch(setLoadingStart());
        const resp = await fetch(`api/item/${item}`, {name, description, category, row, column, expiryDate, quantity, space, area}, 'PUT');
        if (resp.status === 200) {
            if (selectedFile) {
                await dispatch(uploadItemImage(item, selectedFile));
            }
            dispatch(getItemById(item));
            dispatch(setLoadingFinish());
        } else {
            console.log(resp.data)
        }
    }
}

export const startRemoveItem = (item, area, type, consume) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item/remove/${item}`, {area, type, consume}, 'PUT');
        if (resp.status === 200) {
            dispatch(removeFromInventory(item));
        } else {
            console.log(resp.data)
        }
    }
}

export const startDeleteItem = (item, area) => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Eliminando articulo...",
            showConfirmButton: false
        })
        const resp = await fetch(`api/item/${item}`, {area}, 'DELETE');
        SwalMixin.close()
        if (resp.status === 200) {
            dispatch(removeFromInventory(item));
        } else {
            console.log(resp.data)
        }
    }
}

export const startCreateItem = (name, description, category, row, column, expiryDate, quantity, space, area, selectedFile) => {
    return async(dispatch) => {
        const resp = await fetch(`api/item`, {name, description, category, row, column, expiryDate, quantity, space, area}, 'POST');
        if (resp.status === 201) {
            if (selectedFile) {
                await dispatch(uploadItemImage(resp.data.uid, selectedFile))
            }
            dispatch(getInventoryBySpace(space, 1, 15, 0, 0))
        } else {
            console.log(resp.data)
        }
    }
}



