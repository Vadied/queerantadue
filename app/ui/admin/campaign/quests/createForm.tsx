'use client';

import { useFormState } from 'react-dom';
import { create } from '@/lib/campaign/quests/actions';
import { FormState } from '@/types/response.model';
import { TextArea, Input } from '@/ui';

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
        name="title"
        label="Titolo"
        required={true}
        errors={state.errors}
        placeholder="Inserisci titolo"
      />
      <Input
      type="number"
        name="points"
        label="Punti"
        required={true}
        errors={state.errors}
        placeholder="Inserisci punti"
      />
      
      <TextArea
        name="quest"
        label="Missione"
        required={true}
        errors={state.errors}
        placeholder="Inserisci missione"
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
