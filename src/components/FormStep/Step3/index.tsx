import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FormAction, useForm } from '../../../contexts/FormStepContext';
import { institutions } from '../../../mocks/institutions';

import styles from './styles.module.scss';
import { useModal } from '../../../contexts/ModalContext';

export default function Step3() {
  const { handleCloseModal } = useModal();
  const { state, dispatch } = useForm();

  const [institutionSelected, setInstitutionSelectedf] = useState(
    state.institution.id,
  );

  const [isInsitutions] = institutions.map(({ zip }) => zip === '44790000');

  const saveState = () => {
    dispatch({
      type: FormAction.SETINSTITUTION,
      payload: institutionSelected,
    });
  };

  const handleBackStep = () => {
    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 2,
    });

    saveState();
  };

  const submit = () => {
    dispatch({
      type: FormAction.SETINSTITUTION,
      payload: {
        id: institutionSelected,
      },
    });

    dispatch({
      type: FormAction.SETCOMPLETED,
      payload: true,
    });

    handleCloseModal();
  };

  const handleDevicesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(value);

    setInstitutionSelectedf(value);
  };

  return (
    <div id={styles.step3}>
      <form>
        <div className="separator">
          <div></div>
          <div>Instituições</div>
          <div></div>
        </div>

        <div className={`${styles.wrapper}`}>
          {isInsitutions ? (
            <label htmlFor="type">
              <select
                name="institution"
                value={institutionSelected}
                onChange={handleDevicesChange}
              >
                {institutions.map(
                  ({ name, id, zip }, index) =>
                    zip === '44790000' && (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    ),
                )}
              </select>
            </label>
          ) : (
            <p>Sua região não possui instituições próxima a você.</p>
          )}

          {institutions.map(
            institution =>
              institution.id === institutionSelected && (
                <section
                  className={styles.institution_wrapper}
                  key={institution.id}
                >
                  <h1>{institution.name}</h1>
                  <p>{institution.description}</p>
                  <div className={styles.address}>
                    <h4>
                      Cidade: <span>{institution.city}</span>
                    </h4>
                    <h4>
                      Distrito: <span>{institution.district}</span>
                    </h4>
                    <h4>
                      CEP: <span>{institution.zip}</span>
                    </h4>
                  </div>

                  <div className={styles.social}>
                    Redes sociais: {'  '}
                    {institution.social.map(({ name, url, icon }) => (
                      <div key={name}>
                        <img src={icon} alt="" />
                        <a href={url} target="_blank">
                          {name}
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              ),
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
          <button onClick={submit} type="button">
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
}
