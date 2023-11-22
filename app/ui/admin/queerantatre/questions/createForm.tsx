'use client';

import { useFormState } from 'react-dom';

import { create } from '@/lib/queerantatre/questions/actions';
import { FormState } from '@/types/response.model';
import { Select, TextArea } from '@/ui';
import { useCategoriesContext } from '@/contexts/queerantatre';

type Props = {};
const CreateForm = ({}: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  const { categories = [] } = useCategoriesContext();

  console.log(categories);

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
        errors={state.errors}
        placeholder="Scegli le categorie"
        options={categories.map((category) => ({
          value: category.code,
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
