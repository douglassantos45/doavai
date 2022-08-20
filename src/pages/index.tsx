import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';
import { ModalProvider } from '../contexts/ModalContext';
import { Toaster } from 'react-hot-toast';

type Props = {
  alive: boolean;
};

export default function Home({ alive }: Props) {
  return (
    <>
      <ModalProvider>
        <Header />
        <Content />
      </ModalProvider>
      <Footer />
      <Toaster containerStyle={{ fontSize: '1rem' }} />
    </>
  );
}

/* export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/');
  const { alive } = data;
  return { props: { alive } };
};
 */
