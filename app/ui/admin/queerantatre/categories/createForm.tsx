'use client';

import { useFormState } from 'react-dom';

import { create } from '@/lib/queerantatre/categories/actions';
import { FormState } from '@/types/response.model';
import Input from '@/ui/inputs/textInput';

const CreateForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="label"
        label="Nome"
        required={true}
        errors={state.errors}
        placeholder="Inserisci etichetta"
      />
      <Input
        name="code"
        label="Codice"
        required={true}
        errors={state.errors}
        placeholder="Inserisci codice"
      />

      <button
        type="submit"
        className="p-2 rounded text-text border-none bg-button-success w-full"
      >
        Crea
      </button>
    </form>
  );
};

export default CreateForm;
