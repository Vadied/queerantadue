import {
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  multiple?: boolean;
  error?: string;
};

const CustomSelect = ({
  label,
  value,
  name,
  onChange,
  options,
  error,
  multiple = false
}: Props) => {
  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        name={name}
        onChange={onChange}
        label={label}
        multiple={multiple}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
