import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';

import { admin } from '@/assets/constants/navigation';
import Input from '@/ui/inputs/textInput';

const CredentialsForm = () => {
  const initialState = {
    errors: {},
    message: ''
  };

  const [state, setState] = useState(initialState);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setState({
        ...state,
        message: 'Inserisci email e password'
      });
      return;
    }

    signIn('credentials', {
      email,
      password,
      callbackUrl: admin.href
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items.center gap-4"
      >
        <Input
          inputRef={emailRef}
          name="email"
          label="Email"
          type="email"
          required={true}
          placeholder="Inserisci email"
        />
        <Input
          inputRef={passwordRef}
          name="password"
          label="Password"
          type="password"
          required={true}
          placeholder="Inserisci password"
        />

        <button
          type="submit"
          className="p-2 rounded text-text border-none bg-button-primary w-full"
        >
          Entra
        </button>
      </form>
      {state?.message && (
        <div className="errors text-red border-red rounded">
          {state.message}
        </div>
      )}
    </>
  );
};

export default CredentialsForm;
