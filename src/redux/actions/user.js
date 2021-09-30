import { fetch } from "../../helpers/axios";
import { types } from "../types";
import imageCompression from 'browser-image-compression';
import { SwalMixin } from "../../components/SwalMixin";

export const loadUser = (user) => ({
    type: types.userLoad,
    payload: user
})

export const clearUser = () => ({
    type: types.userClear,
})

export const uploadUserImage = (user, image) => {
    return async() => {
        if (image) {
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
    
            SwalMixin.fire({
                icon: "success",
                titleText: "La imagen de perfil ha sido cambiada exitosamente",
                confirmButtonText: "aceptar"
            })
            const resp = await fetch(`api/upload/users/${user}`, formData, 'PUT');
            if (resp.status !== 200) {
                console.log(resp.data)
            }
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