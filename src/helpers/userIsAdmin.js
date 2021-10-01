export const userIsAdmin = (area, useruid) => {
    if (area?.admins?.some((i) => i === useruid) ) {
        console.log(true);
        return true
    } else {
        return false
    }
}