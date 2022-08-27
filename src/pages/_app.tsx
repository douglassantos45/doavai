import { FormProvider } from '../contexts/FormStepContext';
import { ModalProvider } from '../contexts/ModalContext';

import '../../styles/global.scss';

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
