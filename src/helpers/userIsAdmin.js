export const userIsAdmin = (area, useruid) => {
    if (area?.admins?.some(() => useruid) ) {
        return true
    } else {
        return false
    }
}