import { types } from "../types/types";
import { fetch } from "../helpers/axios";

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetch('api/auth/login', {email, password}, 'POST');
        if (resp.status === 200) {
            localStorage.setItem('token', resp.data.loggedUser.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.loggedUser.uid,
                name: resp.data.loggedUser.name
            }));
        } else {
            console.log(resp.data)
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetch('api/users', {name, email, password}, 'POST');
        if (resp.status === 201) {
            localStorage.setItem('token', resp.data.createdUser.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.createdUser.uid,
                name: resp.data.createdUser.name
            }));
        } else {
            console.log(resp.data)
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetch('api/auth/renew');
        if (resp.status === 200) {
            localStorage.setItem('token', resp.data.checkedUser.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.checkedUser.uid,
                name: resp.data.checkedUser.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}


// export const startLogout = () => {
//     return (dispatch) => {
//         localStorage.clear();
//         dispatch(logout());
//         dispatch(eventClearing());
//     }
// }

// const logout = () => ({
//     type: types.authLogout
// })
