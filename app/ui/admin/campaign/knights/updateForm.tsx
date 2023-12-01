'use client';

import { useFormState } from 'react-dom';

import { update } from '@/lib/campaign/quests/actions';
import { FormState } from '@/types/response.model';
import Input from '@/ui/inputs/textInput';
import { TAdventurer } from '@/types/adventurer';

type Props = {
  data: TAdventurer;
};
const UpdateForm = ({ data }: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, data.slug);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="email"
        label="Email"
        type="email"
        value={data.email}
        required={true}
        errors={state.errors}
        placeholder="Inserisci email"
      />
      <Input
        name="points"
        label="Punti"
        type="number"
        value={data.points}
        required={true}
        errors={state.errors}
        placeholder="Inserisci punti"
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
