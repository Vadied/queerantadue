'use client';

import { useFormState } from 'react-dom';

import { update } from '@/lib/users/actions';
import { FormState } from '@/types/response.model';
import { TUser } from '@/types/user';
import Input from '@/ui/inputs/textInput';

type Props = {
  user: TUser;
};
const UpdateForm = ({ user }: Props) => {
  const initialState: FormState = { message: null, errors: {} };
  const updateWithRef = update.bind(null, user.slug);
  const [state, dispatch] = useFormState(updateWithRef, initialState);

  return (
    <form action={dispatch} className="flex flex-wrap justify-between gap-5">
      <Input
        name="email"
        label="Email"
        value={user.email}
        required={true}
        errors={state.errors}
        placeholder="Inserisci email"
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
