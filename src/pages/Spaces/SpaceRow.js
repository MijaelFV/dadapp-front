import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const SpaceRow = ({name, rows, columns}) => {

    return (
        <div className="space-row">    
            <span><FontAwesomeIcon icon={faBox} style={{marginRight:"6px"}} />{name}</span>
            <div>
                <span className="row-data-margin">{rows} Filas</span>
                <span className="row-data-margin">{columns} Columnas</span>
                <span className="row-data-margin">0 Objetos</span>
            </div>
        </div>
    )
}