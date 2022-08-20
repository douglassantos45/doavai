import '../../styles/global.scss';
import { FormProvider } from '../contexts/FormStepContext';

function MyApp({ Component, pageProps }) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
}

export default MyApp;
