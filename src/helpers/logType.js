
export const logType = (type) => {
    let logBgColor;
    let labelType;
    let labelTypeLong;
    let labelBgColor;

    switch (type) {
        case "ADD":
                labelBgColor = "bg-purple-500"
                labelType = "Añadido"
                labelTypeLong = "Articulo Añadido"
                logBgColor = "bg-purple-900"
            break;

        case "MODIFY":
                labelBgColor = "bg-blue-500"
                labelType = "Reubicado"
                labelTypeLong = "Posición Modificada"
                logBgColor = "bg-blue-900"
            break;

        case "DELETE":
                labelBgColor = "bg-gray-700"
                labelType = "Eliminado"
                labelTypeLong = "Articulo Eliminado"
                logBgColor = "bg-gray-700"
            break;

        case "RETURNED":
                labelBgColor = "bg-green-500"
                labelType = "Devuelto"
                labelTypeLong = "Articulo Devuelto"
                logBgColor = "bg-green-900"
            break;

        case "TAKED":
                labelBgColor = "bg-red-500"
                labelType = "Retirado"
                labelTypeLong = "Articulo Retirado"
                logBgColor = "bg-red-900"
            break;

        case "CONSUMED":
                labelBgColor = "bg-yellow-500"
                labelType = "Consumido"
                labelTypeLong = "Articulo Consumido"
                logBgColor = "bg-yellow-900"
            break;

        default: 
            break;
    }

    return {labelType, labelTypeLong, logBgColor, labelBgColor}
}
