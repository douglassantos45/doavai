import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { FormAction, useForm } from '../../contexts/FormStepContext';
import Button from '../Button';
import styles from './styles.module.scss';

export default function Congratulation() {
  const { state, dispatch } = useForm();

  const handleCloseModal = () => {
    dispatch({
      type: FormAction.SETCOMPLETED,
      payload: false,
    });
  };

  if (!state.completed) return;

  return (
    <div id={styles.congratulation}>
      <div className={styles.wrapper}>
        <div className={styles.close_modal} onClick={handleCloseModal}>
          <FiX />
        </div>

        <main>
          <img src="/assets/img/congratulation.svg" alt="" />
          <h1>Congratulation</h1>
          <p>Your donation has been register</p>

          <section>
            <span>Feedback</span>
            <textarea name="feedback" id="feedback"></textarea>
          </section>
        </main>

        <footer>
          <button className={styles.send} onClick={handleCloseModal}>
            Enviar
          </button>
          <button className={styles.cancel} onClick={handleCloseModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}
