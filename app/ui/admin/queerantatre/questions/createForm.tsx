'use client';

import { useFormState } from 'react-dom';

import { create } from '@/lib/queerantatre/questions/actions';
import { FormState } from '@/types/response.model';
import { Select, TextArea } from '@/ui';
import { useQueerantatreContext } from '@/contexts/queerantatre';

const CreateForm = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  const { categories = [] } = useQueerantatreContext();

  return (
    <form action={dispatch} className="flex flex-wrap gap-5">
      <TextArea
        name="text"
        label="Domanda"
        required={true}
        errors={state.errors}
        placeholder="Inserisci la domanda"
      />
      <TextArea
        name="answer"
        label="Risposta"
        required={true}
        errors={state.errors}
        placeholder="Inserisci la risposta"
      />
      <Select
        label="Categorie"
        name="categories"
        multiple={true}
        value={[]}
        errors={state.errors}
        placeholder="Scegli le categorie"
        options={categories.map((category) => ({
          value: category._id.toString(),
          label: category.label
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
