import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';
import styles from './styles.module.scss';

type InputPorps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  value: string;
  style?: string;
  disabled?: boolean;
  error?: {
    errors: FieldError;
    fieldError?: string;
  };
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputPorps> = (
  { name, label, style = '', disabled, value, error, ...rest },
  ref,
) => {
  return (
    <div id={styles.input}>
      <input
        className={`${styles.input_form} ${style} ${
          error?.errors?.message || error?.fieldError ? styles.invalid : ''
        }`}
        name={name}
        id={name}
        placeholder=" "
        ref={ref}
        {...rest}
        defaultValue={value}
        disabled={disabled}
      />
      {!disabled && (
        <label htmlFor={name} className={styles.label_form}>
          {label}
        </label>
      )}
      <p>{error?.errors?.message || error?.fieldError}</p>
    </div>
  );
};

export const Input = forwardRef(InputBase);
