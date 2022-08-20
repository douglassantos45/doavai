import { useForm as useReactHooForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../Input';
import Button from '../../Button';

import { FormAction, useForm } from '../../../contexts/FormStepContext';
import { normalizeZip, normalizePhone } from '../../../utils/masks';
import { InputValidationProps, inputSchema } from '../yupSchema';
import { fieldValidation } from '../../../utils/validation';
import { applyFocus } from '../../../utils/applyFocus';
import { apiCep } from '../../../services/api-cep';
import toast from 'react-hot-toast';

import styles from './styles.module.scss';

export default function Step1() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useReactHooForm<InputValidationProps>({
    resolver: yupResolver(inputSchema),
  });

  const { state, dispatch } = useForm();
  const [fieldsInputInvalid, setFieldsInputInvalid] = useState([]);

  const inputZip = watch('zip');
  const inputPhone = watch('phone');

  useEffect(() => applyFocus('name'), []);

  useEffect(() => {
    if (inputZip) {
      setValue('zip', normalizeZip(inputZip));
    }
  }, [inputZip]);

  useEffect(() => {
    if (inputPhone) {
      setValue('phone', normalizePhone(inputPhone));
    }
  }, [inputPhone]);

  const handleNextPage = () => {
    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 2,
    });
  };

  const onSubmit = data => {
    console.log(data);
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
    if (zip?.length < 8 || zip === undefined) return;

    try {
      const result = await apiCep.get(`${zip}/json/`);
      const { data } = result;
      console.log(data);

      //Verificando se o cep foi encontrado e retornando uma mensagem de erro
      if (data.erro) {
        dispatch({
          type: FormAction.SETZIP,
          payload: '',
        });
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

      applyFocus('number');
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
                fieldError:
                  fieldsInputInvalid.includes('email') &&
                  'Informe o email corretamente. ',
              }}
              value={state.email}
            />

            <label htmlFor="phone" className={`${styles.phone_icon}`}>
              <span>+55</span>
              <Input
                name="phone"
                label="Telefone"
                {...register('phone')}
                error={{
                  errors: errors.phone,
                  fieldError:
                    fieldsInputInvalid.includes('phone') &&
                    'Informe o telefone corretamente. ',
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
              value={state.complement}
            />
          </div>
        </section>
        <Button text="Continuar" type="submit" />
      </form>
    </div>
  );
}
