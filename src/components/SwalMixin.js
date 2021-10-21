import Swal from "sweetalert2/src/sweetalert2";

export const SwalMixin = Swal.mixin({
    toast: true,
    buttonsStyling: false,
    customClass: {
        confirmButton: 'text-black px-4 py-1.5 min-w-max text-sm font-medium uppercase rounded bg-white mr-2',
        cancelButton: 'text-white px-4 py-1.5 min-w-max text-sm font-medium uppercase rounded bg-gray-900'
    },
    background: "#232A39",
    cancelButtonText: "Cancelar",
})