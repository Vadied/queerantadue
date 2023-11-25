import { FormErrors } from '@/types/response.model';

type Props = {
  label: string;
  name: string;
  type?: string;
  inputRef?: any;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
  required?: boolean;
};
const Input = ({
  label,
  name,
  value,
  inputRef,
  required,
  type = 'text',
  errors
}: Props) => {
  return (
    <div className="">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div>
        <input
          className="p-2 rounded border border-width-2 border-border-lighter text-text bg-background"
          id={name}
          ref={inputRef}
          name={name}
          defaultValue={value}
          type={type}
          aria-describedby={`${name}-error`}
          required={required}
        />
      </div>
      {errors?.[name] ? (
        <div id={`${name}-error`} aria-live="polite" className="">
          {errors?.[name].map((error: string) => <p key={error}>{error}</p>)}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
