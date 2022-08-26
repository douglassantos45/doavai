import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { RiSubtractFill } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';
import Button from '../../Button';

import { FormAction, useForm } from '../../../contexts/FormStepContext';
import { conditions, equipaments } from '../../../mocks/devices';

import styles from './styles.module.scss';

const MAX_DEVICES = 4;

export default function Step2() {
  const { state, dispatch } = useForm();

  const [renderDevicesCount, setRenderDevicesCount] = useState(
    state.countDevices,
  );
  const [devicesList, setDevicesList] = useState(state.devices);
  const [totalDeviceError, setTotalDeviceError] = useState('');
  const [selectedDeviceError, setSelectedDeviceError] = useState(false);

  const saveState = () => {
    dispatch({
      type: FormAction.SETDEVICES,
      payload: devicesList,
    });

    dispatch({
      type: FormAction.SETCOUNTDEVICES,
      payload: renderDevicesCount,
    });
  };

  const handleBackStep = () => {
    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 1,
    });

    saveState();
  };

  const handleNextPage = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (let i = 0; i < renderDevicesCount; i++) {
      if (devicesList[i]['type'] === '' || devicesList[i]['condition'] === '') {
        setSelectedDeviceError(true);
        return toast.error('Selecione todos os campos.');
      }
    }

    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 3,
    });

    saveState();
  };

  const handleDevicesChange = (e: ChangeEvent<HTMLSelectElement>, index) => {
    const { name, value } = e.target;
    const list = [...devicesList];

    list[index][name] = value;
    setDevicesList(list);
    setSelectedDeviceError(false);
  };

  const handleDeviceAdd = () => {
    if (devicesList.length < MAX_DEVICES) {
      setDevicesList([...devicesList, { type: '', condition: '' }]);
      setRenderDevicesCount(renderDevicesCount + 1);
    } else {
      setTotalDeviceError('Limite máximo de equipamentos atingido.');
    }
  };

  const handleDeviceRemove = () => {
    const index = renderDevicesCount - 1;
    const list = [...devicesList];
    list.splice(index, 1);

    setDevicesList(list);
    setRenderDevicesCount(index);

    if (totalDeviceError) setTotalDeviceError(null);
  };

  return (
    <div id={styles.step2}>
      <form onSubmit={handleNextPage}>
        <div className="separator">
          <div></div>
          <div>Equipamentos</div>
          <div></div>
        </div>
        <div className={styles.wrapper}>
          {devicesList.map((service, index) => (
            <div key={index} className={`${styles.select_group}`}>
              <label htmlFor="type">
                Equipamentos
                <select
                  name="type"
                  value={service.type}
                  onChange={e => handleDevicesChange(e, index)}
                  className={
                    selectedDeviceError && service.type === ''
                      ? styles.invalid
                      : ''
                  }
                >
                  <option value="" disabled>
                    Selecione o equipamento
                  </option>
                  {equipaments.map(({ name, value }) => (
                    <option value={value} key={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="condition">
                Condição
                <select
                  name="condition"
                  value={service.condition}
                  onChange={e => handleDevicesChange(e, index)}
                  className={
                    selectedDeviceError && service.condition === ''
                      ? styles.invalid
                      : ''
                  }
                >
                  <option value="" disabled>
                    Selecione a condição do equipamento
                  </option>
                  {conditions.map(({ name, value }) => (
                    <option value={value} key={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
          <div className={styles.btn_device}>
            <div onClick={handleDeviceAdd}>
              <span>Adicionar</span>
              <FiPlus />
            </div>
            {devicesList.length > 1 && (
              <div onClick={handleDeviceRemove}>
                <span>Remover</span>
                <RiSubtractFill />
              </div>
            )}
          </div>

          {totalDeviceError && (
            <p className={styles.total_device}>{totalDeviceError}</p>
          )}
        </div>

        <div className={styles.btn_group}>
          <button
            className={styles.btn_back}
            onClick={handleBackStep}
            type="button"
          >
            Voltar
          </button>
          <Button text="Continuar" type="submit" />
        </div>
      </form>
    </div>
  );
}
