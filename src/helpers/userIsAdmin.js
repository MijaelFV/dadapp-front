export const userIsAdmin = (area, useruid) => {
    if (area?.admins?.some((i) => i === useruid) ) {
        return true
    } else {
        return false
    }
}