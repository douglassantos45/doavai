import { ChangeEvent, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { FormAction, useForm } from '../../contexts/FormStepContext';
import { applyFocus } from '../../utils/applyFocus';

import styles from './styles.module.scss';

export default function Congratulation() {
  const { state, dispatch } = useForm();
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    applyFocus('feedback');
  }, [state.completed]);

  const handleCloseModal = () => {
    dispatch({
      type: FormAction.SETCOMPLETED,
      payload: false,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setTextareaValue(value);
  };

  const submit = () => {
    console.log(textareaValue);
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
            <label htmlFor="feedback">Feedback</label>
            <textarea
              name="feedback"
              id="feedback"
              onChange={handleChange}
            ></textarea>
          </section>
        </main>

        <footer>
          <button className={styles.send} onClick={submit}>
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
