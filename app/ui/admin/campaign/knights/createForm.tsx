'use client';

import { useFormState } from 'react-dom';

import { create } from '@/lib/campaign/quests/actions';
import { FormState } from '@/types/response.model';
import Input from '@/ui/inputs/textInput';

const CreateForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="name"
        label="Nome"
        required={true}
        errors={state.errors}
        placeholder="Inserisci nome"
      />
      <Input
        name="surname"
        label="Cognome"
        required={true}
        errors={state.errors}
        placeholder="Inserisci cognome"
      />
      <Input
        name="email"
        label="Email"
        type="email"
        required={true}
        errors={state.errors}
        placeholder="Inserisci email"
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
