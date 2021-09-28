import { types } from "../types";
import { fetch } from "../../helpers/axios";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const loadCategories = (categories) => ({
    type: types.invLoadCategories,
    payload: categories
})

export const getCategoriesBySpace = (spaceId) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${spaceId}`);
        if (resp.status === 200) {
            dispatch(loadCategories(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const createCategory = (spaceId, name) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${spaceId}`, {name}, 'POST');
        if (resp.status === 201) {
            dispatch(getCategoriesBySpace(spaceId))
        } else {
            console.log(resp.data)
        }
    }
}

export const deleteCategory = (spaceId, categoryUid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${categoryUid}`, null, 'DELETE');
        if (resp.status === 200) {
            dispatch(getCategoriesBySpace(spaceId))
        } else {
            Swal.fire({
                toast: true,
                text: resp.data.msg,
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'text-black px-4 py-1.5 min-w-max text-sm font-medium uppercase rounded bg-white' //insert class here
                },
                background: "#232A39",
                icon: 'warning',
                confirmButtonText: "Aceptar",
            })
        }
    }
}