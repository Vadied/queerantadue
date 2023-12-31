import { FormErrors } from "@/types/response.model";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
  rows?: number;
  required?: boolean;
};
const Input = ({
  label,
  name,
  value,
  required,
  rows = 5,
  errors, 
}: Props) => {
  return (
    <div className="min-w-xl">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div>
        <textarea
        className="p-2 rounded border border-width-2 border-border-lighter text-text bg-background"
          id={name}
          name={name}
          defaultValue={value}
          aria-describedby={`${name}-error`}
          required={required}
          rows={rows}
        />
      </div>
      {errors?.[name] ? (
        <div id={`${name}-error`} aria-live="polite" className="">
          {errors?.[name].map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
