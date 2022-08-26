import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { RiMenu3Fill } from 'react-icons/ri';
import { useModal } from '../../contexts/ModalContext';
import { ActiveLink } from '../ActiveLink';

import Button from '../Button';

import styles from './styles.module.scss';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { handleOpenModal } = useModal();
  const { asPath } = useRouter();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={`container ${styles.header}`}>
      <Link href="/">
        <div className={styles.logo}>
          <img src="assets/img/logo.svg" alt="" />
        </div>
      </Link>
      <nav className={showMenu ? styles.show_menu : ''}>
        <li>
          <a href="/404" target="_blank">
            Contact
          </a>
        </li>
        <li>
          <a href="/404" target="_blank">
            About
          </a>
        </li>
        <li>
          <ActiveLink activeClassName={styles.active_link} href="/institutions">
            <a className={`${styles.nav_link} ${styles.active_link}`}>
              Instituições
            </a>
          </ActiveLink>
        </li>
        <li>
          {asPath !== '/institutions' && (
            <Button
              text="Donation"
              setShowModal={e => {
                handleOpenModal();
                setShowMenu(false);
              }}
            />
          )}
        </li>
      </nav>
      {showMenu ? (
        <FiX
          onClick={handleShowMenu}
          className={`${styles.active} ${styles.close_menu}`}
        />
      ) : (
        <RiMenu3Fill
          onClick={handleShowMenu}
          className={`${styles.active} ${styles.show_menu}`}
        />
      )}
    </header>
  );
}
