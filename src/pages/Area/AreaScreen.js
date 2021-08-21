import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingAreas } from '../../redux/actions/area';
import { AreaRow } from './components/AreaRow';
import { ProfileModal } from '../../components/ProfileModal';
import { ShowAvatar } from '../../components/ShowAvatar';

export const AreaScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const areas = useSelector(state => state.area.areas);


    useMemo(() => {
        if (areas.length === 0) {
            console.log('log')
            dispatch(startLoadingAreas(user.uid));
        }
    }, [dispatch, areas, user])

    const handleButton1Click = () => {
        
    }

    const handleButton2Click = () => {
        
    }

    return (
        <div className="area-container">
            <div className="area-column">
                <div className="areaList-container">
                    <div className="avatarContainer">
                        <ShowAvatar username={user.name} userId={user.uid} />
                    </div>
                    <span className="hint">Selecciona un área para trabajar</span>
                    <div className="areaList">
                        {areas.map((area) => (
                            <AreaRow key={area.uid} area={area} />
                        ))}
                    </div>
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
            <ProfileModal />
        </div>
    )
}