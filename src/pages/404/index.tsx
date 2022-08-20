import { AiFillGithub } from 'react-icons/ai';
import styles from './styles.module.scss';

export default function PageNotFound() {
  return (
    <div className={`${styles.pageNotFound}`}>
      <div className={styles.description}>
        <div>
          <h1>Ops...</h1>
          <p>Essa página está em desenvolvimento.</p>
        </div>

        <div className={styles.illustration}>
          <img src="/assets/img/404.gif" alt="" />
        </div>
      </div>

      <footer>
        <a href="/" className={styles.logo}>
          Doa<span>Vai</span>
        </a>
        <a
          href="https://github.com/douglassantos45"
          className={styles.social_link}
          target="_blank"
        >
          <AiFillGithub />
          <span>github.com/douglassantos45</span>
        </a>
      </footer>
    </div>
  );
}
