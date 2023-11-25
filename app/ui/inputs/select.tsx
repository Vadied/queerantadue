import { Select, MenuItem } from '@mui/material';

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
const SelectInput = ({
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
        <Select
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
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      {errors?.[name] ? (
        <div id={`${name}-error`} aria-live="polite" className="">
          {errors?.[name].map((error: string) => <p key={error}>{error}</p>)}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
