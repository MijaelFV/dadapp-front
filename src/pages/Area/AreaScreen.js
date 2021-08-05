import { Avatar } from '@material-ui/core'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingAreas } from '../../actions/area';
import { AreaRow } from '../../components/Area/AreaRow';

export const AreaScreen = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.uid);
    const areas = useSelector(state => state.area.areas);


    useMemo(() => {
        if (areas.length === 0) {
            console.log('log')
            dispatch(startLoadingAreas(userId));
        }
    }, [dispatch, areas])

    const handleButton1Click = () => {
        
    }

    const handleButton2Click = () => {
        
    }

    return (
        <div className="area-container">
            <div className="area-column">
                <div className="areaList">
                    <div className="topBar">
                        <span className="topBar-title">Selecciona un área para trabajar</span>
                        <Avatar/>
                    </div>
                    {areas.map((area) => (
                        <AreaRow key={area.uid} area={area} />
                    ))}
                </div>
                <div className="buttons-container">
                    <div className="button1">
                        <span
                            onClick={{handleButton1Click}}
                        >
                            Crear nueva Área
                        </span>
                    </div>
                    <div className="button2">
                        <span
                            onClick={{handleButton2Click}}
                        >
                            Unirse a un Área existente
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
