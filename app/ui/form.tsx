'use client';

import { FormEvent, ReactNode } from 'react';

type Props<T> = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  children: ReactNode;
};
const Form = <T extends {}>({ onSubmit, disabled, children }: Props<T>) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default Form;
