import { BsFillHeartFill } from 'react-icons/bs';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Design by Douglas Tott <BsFillHeartFill />
      </p>
    </footer>
  );
}
