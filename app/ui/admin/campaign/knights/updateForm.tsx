'use client';

import { useFormState } from 'react-dom';

import { update } from '@/lib/campaign/knights/actions';
import { FormState } from '@/types/response.model';
import { useCampaignContext } from '@/contexts/campaign';
import { Select, Input } from '@/ui';
import { TAdventurer } from '@/types/campaign.model';

type Props = {
  data: TAdventurer;
};
const UpdateForm = ({ data }: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, data.slug);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  const { quests = [] } = useCampaignContext();

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="character"
        label="Personaggio"
        required={true}
        value={data.character}
        errors={state.errors}
        placeholder="Inserisci nome del personaggio"
      />

      <Select
        label="Missioni"
        name="quests"
        multiple={true}
        value={data.quests}
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
        Modifica
      </button>
    </form>
  );
};

export default UpdateForm;
