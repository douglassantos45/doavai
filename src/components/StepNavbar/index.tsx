import { useForm } from '../../contexts/FormStepContext';
import styles from './styles.module.scss';

export default function StepNavbar() {
  const { state } = useForm();

  return (
    <nav id={styles.step_nav}>
      <ul className={styles.step_wrapper}>
        <li className={state.currentStep === 1 ? styles.active : ''}>
          <span>1</span>
          <p>Dados pessoais</p>
        </li>

        <li className={state.currentStep === 2 ? styles.active : ''}>
          <span>2</span>
          <p>Equipamentos</p>
        </li>

        <li className={state.currentStep === 3 ? styles.active : ''}>
          <span>3</span>
          <p>Instituição</p>
        </li>
      </ul>
    </nav>
  );
}
