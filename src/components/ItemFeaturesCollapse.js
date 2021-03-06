import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { Collapse, Divider } from '@mui/material'

export const ItemFeaturesCollapse = ({item, isCollapseOpen, index}) => {

    const createData = (label, value) => {
        return { label, value };
    }

    const features = [
        item.expiryDate && createData("Vencimiento", moment.utc(item.expiryDate).locale("es").format('DD/MM/YY')),
        item.quantity !== null && createData("Cantidad", item.quantity),
        item.space.name !== null && createData("Espacio", item.space?.name),
        createData("Fila", item.row),
        createData("Columna", item.column),
        createData("Categoria", item.category?.name)
    ]

    return (
        <Collapse in={isCollapseOpen === index} timeout="auto" unmountOnExit>
                    <div className={`w-full flex justify-center rounded-bl-xl rounded-br-xl overflow-hidden transition-colors ${isCollapseOpen === index ? "bg-gray-700" : ""}`}>
                        <div className="w-11/12 flex flex-col pb-4">
                            {
                                features.map((feature, i) => {
                                    if (feature !== null) {
                                        return (
                                            [<div key={feature.label} className={`flex px-1`}>
                                                <h1 className="text-gray-300 mr-auto">{feature.label}</h1>
                                                <p className="whitespace-nowrap overflow-ellipsis overflow-hidden" style={{maxWidth:"50%"}}>{feature.value}</p>
                                            </div>,
                                            <Divider key={i} />]
                                        )
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
        </Collapse>
    )
}
