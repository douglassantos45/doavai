import '../../styles/global.scss';
import { FormProvider } from '../contexts/FormStepContext';
import { ModalProvider } from '../contexts/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <FormProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </FormProvider>
  );
}

export default MyApp;
