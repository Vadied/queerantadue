'use client';

import { useFormState } from 'react-dom';

import { create } from '@/lib/campaign/knights/actions';
import { FormState } from '@/types/response.model';
import { useCampaignContext } from '@/contexts/campaign';
import { Select, Input } from '@/ui';

const CreateForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  const { quests = [] } = useCampaignContext();

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
        name="character"
        label="Personaggio"
        required={true}
        errors={state.errors}
        placeholder="Inserisci nome del personaggio"
      />

      <Select 
        label="Missioni"
        name="quests"
        multiple={true}
        value={[]}
        errors={state.errors}
        placeholder="Scegli le missioni compiute"
        options={quests.map((category) => ({
          value: category._id.toString(),
          label: category.name
        }))}
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
