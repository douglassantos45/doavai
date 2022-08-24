import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

import { Toaster } from 'react-hot-toast';
import Modal from '../components/Modal';
import Congratulation from '../components/Congratulation';

export default function Home() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
      <Modal />
      <Congratulation />
      <Toaster containerStyle={{ fontSize: '1rem' }} />
    </>
  );
}
