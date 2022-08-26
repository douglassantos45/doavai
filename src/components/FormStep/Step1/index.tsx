import { useForm as useReactHooForm } from 'react-hook-form';
import { InputValidationProps, inputSchema } from '../yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import validator from 'validator';

import { Input } from '../../Input';
import Button from '../../Button';

import { FormAction, useForm } from '../../../contexts/FormStepContext';
import { normalizeZip, normalizePhone } from '../../../utils/masks';
import { apiCep } from '../../../services/api-cep';

import styles from './styles.module.scss';

type FormInputProps = {
  name: string;
  email?: string;
  phone: string;
  zip: string;
  city?: string;
  state?: string;
  number: string;
  streetAddress: string;
  district: string;
  complement?: string;
};

export default function Step1() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useReactHooForm<InputValidationProps>({
    resolver: yupResolver(inputSchema),
  });

  const { state, dispatch } = useForm();
  const [fieldsInputInvalid, setFieldsInputInvalid] = useState([]);
  const [inputPhoneError, setInputPhoneError] = useState('');
  const [inputEmailError, setInputEmailError] = useState('');

  const inputZip = watch('zip');
  const inputPhone = watch('phone');
  const inputEmail = watch('email');

  useEffect(() => setFocus('name'), []);

  useEffect(() => {
    if (inputZip) {
      setValue('zip', normalizeZip(inputZip));
    }

    if (inputPhone) {
      setValue('phone', normalizePhone(inputPhone));
      setInputPhoneError('');
      if (!validator.isMobilePhone(inputPhone, ['pt-BR'])) {
        setInputPhoneError('Informe o telefone corretamente. ');
        setFocus('phone');
      }
    }

    if (inputEmail) {
      setInputEmailError('');
      if (!validator.isEmail(inputEmail)) {
        setInputEmailError('Informe um e-mail válido.');
        setFocus('email');
      }
    }
  }, [inputPhone || inputEmail || inputZip]);

  const handleNextPage = () => {
    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 2,
    });
  };

  const onSubmit = (data: FormInputProps) => {
    Object.keys(data).forEach(input => {
      const value = data[input];

      if (input !== 'city' && input !== 'state') {
        dispatch({
          type: FormAction[`SET${input.toUpperCase()}`],
          payload: value,
        });
      }
    });
    handleNextPage();
  };

  const checkCep = async () => {
    const zip = inputZip?.replace('-', '');
    if (zip.length === 0) return;

    if (zip?.length < 8 || zip === undefined)
      return toast.error('CEP inválido.');

    try {
      const result = await apiCep.get(`${zip}/json/`);
      const { data } = result;

      //Verificando se o cep foi encontrado e retornando uma mensagem de erro
      if (data.erro) {
        dispatch({
          type: FormAction.SETZIP,
          payload: '',
        });

        setValue('city', '');
        setValue('state', '');
        setValue('streetAddress', '');
        setValue('district', '');

        setFocus('zip');
        return toast.error('Cep Invalido');
      }

      dispatch({
        type: FormAction.SETCITY,
        payload: data.localidade,
      });

      dispatch({
        type: FormAction.SETSTREETADDRESS,
        payload: data.logradouro,
      });

      dispatch({
        type: FormAction.SETSTATE,
        payload: data.uf,
      });

      dispatch({
        type: FormAction.SETDISTRICT,
        payload: data.bairro,
      });

      dispatch({
        type: FormAction.SETZIP,
        payload: zip,
      });

      setValue('city', data.localidade);
      setValue('state', data.uf);
      setValue('streetAddress', data.logradouro);
      setValue('district', data.bairro);

      setFocus('number');
    } catch (e) {
      return toast.error('Serviço de CEP indisponível no momento.');
    }
  };

  return (
    <div id={styles.step1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.info}>
          <div className="separator">
            <div></div>
            <div>Informações</div>
            <div></div>
          </div>

          <Input
            name="name"
            label="Nome"
            {...register('name')}
            error={{
              errors: errors.name,
              fieldError:
                fieldsInputInvalid.includes('name') &&
                'Informe o nome corretamente. ',
            }}
            value={state.name}
          />

          <div className="row">
            <Input
              name="email"
              label="Email"
              {...register('email')}
              error={{
                errors: errors.email,
                fieldError: fieldsInputInvalid.includes('email')
                  ? 'Informe o email corretamente. '
                  : inputEmailError,
              }}
              value={state.email}
            />

            <label htmlFor="phone" className={`${styles.phone_icon}`}>
              <span>+55</span>
              <Input
                name="phone"
                label="Telefone"
                type="tel"
                {...register('phone')}
                error={{
                  errors: errors.phone,
                  fieldError: fieldsInputInvalid.includes('phone')
                    ? 'Informe o telefone corretamente.'
                    : inputPhoneError,
                }}
                value={state.phone}
              />
            </label>
          </div>
        </section>

        <section>
          <div className="separator">
            <div></div>
            <div>Endereço</div>
            <div></div>
          </div>

          <div className="row">
            <Input
              name="zip"
              label="CEP"
              {...register('zip')}
              error={{
                errors: errors.zip,
                fieldError:
                  fieldsInputInvalid.includes('zip') &&
                  'Informe o CEP corretamente. ',
              }}
              onBlur={checkCep}
              value={state.zip}
            />

            <Input
              name="city"
              label="Cidade"
              {...register('city')}
              error={{
                errors: errors.city,
              }}
              value={state.city}
              placeholder="Cidade"
              disabled
            />

            <div className="sm">
              <Input
                style="sm"
                name="state"
                label="UF"
                {...register('state')}
                error={{
                  errors: errors.state,
                }}
                value={state.state}
                placeholder="UF"
                disabled
              />

              <Input
                style="sm"
                name="number"
                label="Número"
                {...register('number')}
                error={{
                  errors: errors.number,
                }}
                value={state.number}
              />
            </div>
          </div>

          <div className="row">
            <Input
              name="streetAddress"
              label="Rua"
              {...register('streetAddress')}
              error={{
                errors: errors.streetAddress,
              }}
              value={state.streetAddress}
            />

            <Input
              name="district"
              label="Distrito"
              {...register('district')}
              error={{
                errors: errors.district,
              }}
              value={state.district}
            />

            <Input
              name="complement"
              label="Complemento"
              {...register('complement')}
              value={state.complement}
            />
          </div>
        </section>
        <Button text="Continuar" type="submit" />
      </form>
    </div>
  );
}
