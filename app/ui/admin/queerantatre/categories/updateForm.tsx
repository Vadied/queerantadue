'use client';

import { useFormState } from 'react-dom';

import { update } from '@/lib/queerantatre/categories/actions';
import { FormState } from '@/types/response.model';
import Input from '@/ui/inputs/textInput';
import { TActualCategory } from '@/types/queerantatre.model';

type Props = {
  data: TActualCategory;
};
const UpdateForm = ({ data }: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, data.code);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="label"
        label="Nome"
        required={true}
        value={data.label}
        errors={state.errors}
        placeholder="Inserisci etichetta"
      />
      <Input
        name="code"
        label="Codice"
        value={data.code}
        required={true}
        errors={state.errors}
        placeholder="Inserisci codice"
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
