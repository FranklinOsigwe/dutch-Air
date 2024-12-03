import { Dispatch, ReactNode, SetStateAction } from 'react'

interface IProps {
    children: ReactNode
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ children, showModal }: IProps) => {
    if (!showModal) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {children}
        </div>
    )
}

export default Modal