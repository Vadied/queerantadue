'use client';

import { useFormState } from 'react-dom';

import { addCredentials } from '@/lib/users/actions';
import { FormState } from '@/types/response.model';
import Input from '@/ui/inputs/textInput';

const RegisterForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addCredentials, initialState);

  return (
    <div className="flex flex-col gap-4 items-center mb-8">
      <form action={dispatch} className="flex flex-col items.center gap-4">
        <Input
          name="email"
          label="Email"
          type="email"
          required={true}
          errors={state.errors}
          placeholder="Inserisci email"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          required={true}
          errors={state.errors}
          placeholder="Inserisci password"
        />

        <button
          type="submit"
          className="p-2 rounded text-text border-none bg-button-primary w-full"
        >
          Registra
        </button>
      </form>
      {state.message && (
        <div className="errors text-danger border p-4 border-danger rounded">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
