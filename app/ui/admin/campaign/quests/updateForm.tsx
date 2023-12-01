'use client';

import { useFormState } from 'react-dom';
import { update } from '@/lib/campaign/quests/actions';
import { FormState } from '@/types/response.model';
import { TQuest } from '@/types/campaign.model';
import { TextArea, Input } from '@/ui';

type Props = {
  data: TQuest;
};
const UpdateForm = ({ data }: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, data.slug);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      
      <Input
        name="name"
        label="Nome"
        required={true}
        value={data.name}
        errors={state.errors}
        placeholder="Inserisci nome"
      />
      <Input
        name="title"
        label="Titolo"
        required={true}
        value={data.title}
        errors={state.errors}
        placeholder="Inserisci titolo"
      />
      <Input
      type="number"
        name="points"
        label="Punti"
        value={data.points}
        required={true}
        errors={state.errors}
        placeholder="Inserisci punti"
      />
      
      <TextArea
        name="quest"
        label="Missione"
        required={true}
        value={data.quest}
        errors={state.errors}
        placeholder="Inserisci missione"
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
