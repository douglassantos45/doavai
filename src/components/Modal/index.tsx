import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

import { useModal } from '../../contexts/ModalContext';
import FormStep from '../FormStep';
import StepNavbar from '../StepNavbar';
import styles from './styles.module.scss';

export default function Modal() {
  const { showModal, handleCloseModal } = useModal();
  const modalEl = useRef(null);

  useEffect(() => {
    if (modalEl.current !== null) {
      setTimeout(
        () => (modalEl.current.style.transform = 'translateY(0)'),
        400,
      );
    }
  }, [showModal]);

  const closeModal = () => {
    modalEl.current.style.transform = 'translateY(calc(-100% - 10rem))';
    setTimeout(() => handleCloseModal(), 200);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div id={styles.modal}>
      <div className={styles.modal_wrapper} ref={modalEl}>
        <header>
          Doa<span>Vai</span>
          <StepNavbar />
        </header>
        <div onClick={closeModal} className={styles.close_modal}>
          <FiX />
        </div>
        <div className={styles.modal_form}>
          <FormStep />
        </div>
      </div>
    </div>
  );
}
