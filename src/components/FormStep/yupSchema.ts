import * as yup from 'yup';

export type InputValidationProps = {
  name: string;
  email: string;
  phone: string;
  zip: string;
  number: string;
  state: string;
  city: string;
  streetAddress: string;
  district: string;
  complement: string;
};

export const inputSchema = yup
  .object({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(80, 'Máximo de 20 caracteres'),
    email: yup.string(),
    phone: yup.string().required('O telefone é obrigatório'),
    zip: yup
      .string()
      .required('O CEP é obrigatório')
      .min(3, 'Mínimo de 8 caracteres')
      .max(20, 'Máximo de 8 caracteres'),
    number: yup
      .string()
      .min(1, 'Min. de 1 caract.')
      .max(999999, 'O número informado é muito grande.'),
    streetAddress: yup
      .string()
      .required('A rua é obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(50, 'Máximo de 20 caracteres'),
    district: yup
      .string()
      .required('O distrito é obrigatório.')
      .min(3, 'Mínimo de 3 caracteres')
      .max(50, 'Máximo de 20 caracteres'),
    city: yup.string(),
  })
  .required();
