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

export type SelectValidationProps = {
  device: string;
  condition?: string;
};

export const inputSchema = yup
  .object({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(80, 'Máximo de 20 caracteres'),
    email: yup.string().required('E-mail é obrigatório'),
    phone: yup.string().required('O telefone é obrigatório'),
    zip: yup
      .string()
      .min(3, 'Mínimo de 8 caracteres')
      .max(20, 'Máximo de 8 caracteres')
      .required('O CEP é obrigatório'),
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
      .min(3, 'Mínimo de 3 caracteres')
      .max(50, 'Máximo de 20 caracteres')
      .required('O distrito é obrigatório.'),
    city: yup.string(),
  })
  .required();

export const selectSchema = yup
  .object({
    device: yup.string().required('O equipamento é obrigatório'),
  })
  .required();
