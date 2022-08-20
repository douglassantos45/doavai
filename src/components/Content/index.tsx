import { useForm } from '../../contexts/FormStepContext';
import { useModal } from '../../contexts/ModalContext';
import Button from '../Button';
import Congratulation from '../Congratulation';
import Modal from '../Modal';
import styles from './styles.module.scss';

export default function Content() {
  const { handleOpenModal } = useModal();
  const { state } = useForm();

  return (
    <>
      <div className={`container ${styles.content_wrapper}`}>
        <h1 className={styles.title}>
          Doa<span className={styles.text_logo}>Vai</span>
        </h1>
        <p className={styles.description}>
          Venha fazer parte do grupo de doadores da <b>Doa</b>
          <span className={styles.text_logo}>Vai</span>. Se você possui algum
          computador “velho” que não usa mais ou está pensando em comprar um
          computador novo, não deixe o antigo pegando poeira, ajuda quem
          precisa, faça uma doação.
        </p>

        <Button text="Donation Now 🤗" setShowModal={handleOpenModal} />

        <img src="assets/img/illustration.svg" alt="" />
      </div>
      <Modal />
      <Congratulation />
    </>
  );
}
