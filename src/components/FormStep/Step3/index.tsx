import { ChangeEvent, useState } from 'react';
import { FormAction, useForm } from '../../../contexts/FormStepContext';
import { institutions } from '../../../mocks/institutions';

import styles from './styles.module.scss';
import { useModal } from '../../../contexts/ModalContext';

export default function Step3() {
  const { handleCloseModal } = useModal();
  const { state, dispatch } = useForm();

  const [isInsitutionsZip] = institutions.map(
    ({ zip }) => zip === state.zip.replace('-', ''),
  );

  const [institutionSelected, setInstitutionSelected] = useState(
    state.institutionId,
  );

  const saveState = () => {
    dispatch({
      type: FormAction.SETINSTITUTION,
      payload: institutionSelected,
    });

    dispatch({
      type: FormAction.SETCURRENTSTEP,
      payload: 2,
    });
  };

  const handleBackStep = () => {
    saveState();
  };

  const submit = async () => {
    dispatch({
      type: FormAction.SETINSTITUTION,
      payload: institutionSelected,
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

    setInstitutionSelected(value);
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
          {isInsitutionsZip ? (
            <label htmlFor="type">
              <select
                name="institution"
                value={institutionSelected}
                onChange={handleDevicesChange}
              >
                {institutions.map(
                  ({ name, id, zip }, index) =>
                    zip === state.zip.replace('-', '') && (
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
