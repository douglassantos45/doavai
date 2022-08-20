import { useContext, createContext, useState, ReactNode } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

//Context
const ModalContext = createContext<ContextProps | undefined>(undefined);

//Provider
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const value = { showModal, handleOpenModal, handleCloseModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

//Hook
export const useModal = () => {
  const context = useContext(ModalContext);

  return context;
};
