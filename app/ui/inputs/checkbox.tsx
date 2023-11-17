import { FormErrors } from "@/types/response.model";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
  required?: boolean;
};
const Checkbox = ({
  label,
  name,
  value,
  required,
  type = "text",
  errors, 
}: Props) => {
  return (
    <div className="">
      <label htmlFor={name} className="">
        {label}
      </label>
      <div>
        <input
          id={name}
          name={name}
          defaultValue={value}
          type={type}
          aria-describedby={`${name}-error`}
          required={required}
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

export default Checkbox;
