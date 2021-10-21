import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { SwalMixin } from "../../components/SwalMixin";

export const loadCategories = (categories) => ({
    type: types.invLoadCategories,
    payload: categories
})

export const getCategoriesBySpace = (spaceid) => {
    return async(dispatch) => {
        const resp = await fetch(`api/category/${spaceid}`);
        if (resp.status === 200) {
            dispatch(loadCategories(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}

export const createCategory = (spaceid, name) => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Creando categoria.",
            icon: "info",
            showConfirmButton: false
        })
        const resp = await fetch(`api/category/${spaceid}`, {name}, 'POST');
        SwalMixin.close();
        if (resp.status === 201) {
            dispatch(getCategoriesBySpace(spaceid))
        } else {
            SwalMixin.fire({
                text: resp.data.msg || "No se ingreso un nombre de categoria",
                icon: 'warning',
                confirmButtonText: "Aceptar",
            })
        }
    }
}

export const deleteCategory = (spaceid, categoryid) => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Eliminando categoria.",
            icon: "info",
            showConfirmButton: false
        })
        const resp = await fetch(`api/category/${spaceid}/${categoryid}`, null, 'DELETE');
        SwalMixin.close();
        if (resp.status === 200) {
            dispatch(getCategoriesBySpace(spaceid))
        } else {
            SwalMixin.fire({
                text: resp?.data?.msg || resp?.data?.errors[0].msg,
                icon: 'warning',
                confirmButtonText: "Aceptar",
            })
        }
    }
}