'use client';

import { useFormState } from 'react-dom';

import { update } from '@/lib/queerantatre/questions/actions';
import { FormState } from '@/types/response.model';
import { TActualQuestion } from '@/types/queerantatre.model';
import { Select, TextArea } from '@/ui';
import { useQueerantatreContext } from '@/contexts/queerantatre';

type Props = {
  data: TActualQuestion;
};
const UpdateForm = ({ data }: Props) => {
  const { categories = [] } = useQueerantatreContext();
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, data.slug);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
       <TextArea
        name="text"
        label="Domanda"
        value={data.text}
        required={true}
        errors={state.errors}
        placeholder="Inserisci la domanda"
      />
      <TextArea
        name="answer"
        value={data.answer}
        label="Risposta"
        required={true}
        errors={state.errors}
        placeholder="Inserisci la risposta"
      />
      <Select
        label="Categorie"
        name="categories"
        multiple={true}
        value={data.categories}
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
        Modifica
      </button>
    </form>
  );
};

export default UpdateForm;
