import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { RiMenu3Fill } from 'react-icons/ri';
import { useModal } from '../../contexts/ModalContext';

import Button from '../Button';

import styles from './styles.module.scss';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { handleOpenModal } = useModal();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.logo}>
        <img src="assets/img/logo.svg" alt="" />
      </div>
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
          <a href="/404" target="_blank">
            Company
          </a>
        </li>
        <li>
          <Button
            text="Donation"
            setShowModal={e => {
              handleOpenModal();
              setShowMenu(false);
            }}
          />
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
