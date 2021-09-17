export const showUserRole = (area, useruid) => {
    if (area?.admins?.includes(useruid)) {
        return <p className="font-medium text-base text-gray-400">Administrador</p>
    } else {
        return <p className="font-medium text-base text-gray-400">Miembro</p>
    }
}