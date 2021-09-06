import { fetch } from "../../helpers/axios";
import { types } from "../types";

export const loadUser = (user) => ({
    type: types.userLoad,
    payload: user
})

export const clearUser = () => ({
    type: types.userClear,
})

export const getUserById = (id) => {
    return async(dispatch) => {
        const resp = await fetch(`api/user/${id}`);
        if (resp.status === 200) {
            dispatch(loadUser(resp.data))
        } else {
            console.log(resp.data)
        }
    }
}