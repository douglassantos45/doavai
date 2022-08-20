import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  setShowModal?: (showModal: boolean) => void;
};

export default function Button({ text, setShowModal }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={() => setShowModal && setShowModal(true)}
    >
      {text}
    </button>
  );
}
