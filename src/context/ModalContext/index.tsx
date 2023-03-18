import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextProps {
    showModal: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext({} as ModalContextProps);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
