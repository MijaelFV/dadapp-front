export const showUserRole = (area, useruid) => {
    if (area?.admins?.includes(useruid) || !!area?.admins?.filter(user => user._id === useruid)) {
        return "Administrador"
    } else {
        return "Miembro"
    }
}