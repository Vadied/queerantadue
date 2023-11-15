"use client";

import { FormEvent, ReactNode } from 'react';

type Props<T> = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};
const Form = <T extends {}>({ onSubmit, children }: Props<T>) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
