// export const getInventoryByQuery = (areaId, query) => {
//     return async(dispatch) => {
//         const resp = await fetch(`api/item/search/${areaId}?query=${query}`);
//         if (resp.status === 200) {
//             dispatch(loadInventory(resp.data))
//         } else {
//             console.log(resp.data)
//         }
//     }
// }

import { fetch } from "../../helpers/axios";
import { types } from "../types";

export const loadSearch = (data) => ({
    type: types.searchLoad,
    payload: data
})

export const clearSearch = () => ({
    type: types.searchClear,
})

export const getSearch = (type, areaId, query, spaceid = '') => {
    return async(dispatch) => {
        const resp = await fetch(`api/search/${type}/${areaId}?query=${query}&spaceid=${spaceid}`);
        if (resp.status === 200) {
            dispatch(loadSearch(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}
