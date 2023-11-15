import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';


type Props = {
    label: string;
    value: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
}

const Input = ({ label, value, name, onChange, error = false, helperText = '' }: Props) => {
    return (
        <TextField
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={error}
            helperText={helperText}
        />
    );
};

export default Input;
