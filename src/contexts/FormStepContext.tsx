import { createContext, ReactNode, useContext, useReducer } from 'react';

type FormProviderProps = {
  children: ReactNode;
};

type ActionProps = {
  type: FormAction;
  payload: any;
};

type StateProps = {
  currentStep: number;
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
  devices: { type: string; condition: string }[];
  countDevices: number;
  completed: boolean;
};

type ContextProps = {
  state: StateProps;
  dispatch: (action: ActionProps) => void;
};

const initialData: StateProps = {
  currentStep: 1,
  name: '',
  email: '',
  phone: '',
  zip: '',
  number: '',
  state: '',
  city: '',
  streetAddress: '',
  district: '',
  complement: '',
  devices: [
    {
      type: '',
      condition: '',
    },
  ],
  countDevices: 1,
  completed: false,
};

//Context
const FormContext = createContext<ContextProps | undefined>(undefined);

//Criando ações
export enum FormAction {
  SETCURRENTSTEP,
  SETNAME,
  SETEMAIL,
  SETPHONE,
  SETZIP,
  SETNUMBER,
  SETSTATE,
  SETCITY,
  SETSTREETADDRESS,
  SETDISTRICT,
  SETCOMPLEMENT,
  SETDEVICES,
  SETCOUNTDEVICES,
  SETCOMPLETED,
}
//Recebe dados e ações
const formReducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    //State são os dados que eu já tenho
    //payload são os dados que quero alterar
    case FormAction.SETCURRENTSTEP:
      return { ...state, currentStep: action.payload };
    case FormAction.SETNAME:
      return { ...state, name: action.payload };
    case FormAction.SETEMAIL:
      return { ...state, email: action.payload };
    case FormAction.SETPHONE:
      return { ...state, phone: action.payload };
    case FormAction.SETZIP:
      return { ...state, zip: action.payload };
    case FormAction.SETNUMBER:
      return { ...state, number: action.payload };
    case FormAction.SETSTATE:
      return { ...state, state: action.payload };
    case FormAction.SETCITY:
      return { ...state, city: action.payload };
    case FormAction.SETSTREETADDRESS:
      return { ...state, streetAddress: action.payload };
    case FormAction.SETDISTRICT:
      return { ...state, district: action.payload };
    case FormAction.SETCOMPLEMENT:
      return { ...state, complement: action.payload };

    case FormAction.SETDEVICES:
      return { ...state, devices: action.payload };
    case FormAction.SETCOUNTDEVICES:
      return { ...state, countDevices: action.payload };

    case FormAction.SETCOMPLETED:
      return { ...state, completed: action.payload };

    default:
      return state;
  }
};

//Provider
export const FormProvider = ({ children }: FormProviderProps) => {
  //State - dados iniciais, dispatch - função para alterar os dados
  const [state, dispatch] = useReducer(formReducer, initialData);
  const value = { state, dispatch };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

//Context Hook
export const useForm = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('userForm precisa ser usado dentro do FormProvider');
  }

  return context;
};
