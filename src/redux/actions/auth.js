import { types } from "../types";
import { fetch } from "../../helpers/axios";
import { startClearArea } from "./area";
import { errorLoad } from "./error";
import { SwalMixin } from "../../components/SwalMixin";

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

const logOut = () => ({
    type: types.authLogOut,
})

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(startClearArea());
        dispatch(logOut());
    }
}



export const startLogin = (email, password) => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Iniciando sesión...",
            showConfirmButton: false
        })
        const resp = await fetch('api/auth/login', {email, password}, 'POST');
        SwalMixin.close()
        if (resp?.status === 200) {
            localStorage.setItem('token', resp.data.loggedUser.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data?.loggedUser.uid,
                name: resp.data?.loggedUser.name,
                image: resp.data?.checkedUser?.image
            }));
        } else {
            const data = {
                param: resp?.data?.param || resp?.data?.errors[0].param,
                msg: resp?.data?.msg || resp?.data?.errors[0].msg
            }
            dispatch(errorLoad(data))
        }
    }
}

export const startRegister = (name, email, password, password2) => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Esperando respuesta del servidor",
            icon: "info",
            showConfirmButton: false
        })
        const resp = await fetch('api/user', {name, email, password, password2}, 'POST');
        if (resp?.status === 201) {
            dispatch(startLogin(email, password))
        } else {
            SwalMixin.close()
            const data = {
                param: resp?.data?.param || resp?.data?.errors[0].param,
                msg: resp?.data?.msg || resp?.data?.errors[0].msg
            }
            dispatch(errorLoad(data))
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        SwalMixin.fire({
            titleText: "Iniciando sesión...",
            showConfirmButton: false
        })
        const resp = await fetch('api/auth/renew');
        SwalMixin.close()
        if (resp?.status === 200) {
            localStorage.setItem('token', resp.data?.checkedUser.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: resp.data?.checkedUser?.uid,
                name: resp.data?.checkedUser?.name,
                image: resp.data?.checkedUser?.image
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

