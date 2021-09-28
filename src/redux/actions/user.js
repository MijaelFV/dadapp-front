import { fetch } from "../../helpers/axios";
import { types } from "../types";

export const loadUser = (user) => ({
    type: types.userLoad,
    payload: user
})

export const clearUser = () => ({
    type: types.userClear,
})

export const uploadUserImage = (user, image) => {
    return async() => {
        const formData = new FormData();
        formData.append('file', image);
        const resp = await fetch(`api/upload/users/${user}`, formData, 'PUT');
        if (resp.status !== 200) {
            console.log(resp.data)
        }
    }
}

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