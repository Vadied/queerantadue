import { FormErrors } from '@/types/response.model';

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
  required?: boolean;
  multiple?: boolean;
  options?: { value: string; label: string }[];
};
const Select = ({
  label,
  name,
  value,
  multiple = false,
  placeholder = '',
  options = [],
  required,
  errors
}: Props) => {
  return (
    <div className="min-w-md">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div>
        <select
          className="p-2 rounded border border-width-2 border-border-lighter text-text bg-background min-w-md"
          id={name}
          name={name}
          defaultValue={value}
          multiple={multiple}
          aria-describedby={`${name}-error`}
          required={required}
        >
          {placeholder && <option value="" disabled>{placeholder} </option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors?.[name] ? (
        <div id={`${name}-error`} aria-live="polite" className="">
          {errors?.[name].map((error: string) => <p key={error}>{error}</p>)}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
