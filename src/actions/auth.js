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
        if (resp.statusText === "OK") {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.uid,
                name: resp.data.name
            }));
        } else {
            console.log('error')
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetch('api/users', {name, email, password}, 'POST');
        if (resp.statusText === "OK") {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.uid,
                name: resp.data.name
            }));
        } else {
            console.log('error')
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetch('api/auth/renew');
        console.log(resp)
        if (resp.statusText === "Created") {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data.uid,
                name: resp.data.name
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
