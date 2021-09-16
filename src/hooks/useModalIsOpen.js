import { useMemo } from 'react'
import { useSelector } from "react-redux";

export const useModalIsOpen = (modalToOpen) => {
    const activeModal = useSelector(state => state.ui.modalIsOpen)
    const thisModalIsOpen = useMemo(() => {
        if (activeModal === modalToOpen) {
            return true;
        } else {
            return false;
        }
    }, [activeModal, modalToOpen])

    return thisModalIsOpen
}
