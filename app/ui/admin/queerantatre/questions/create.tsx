'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { TActualCategory, TActualQuestion } from '@/types/queerantatre.model';
import Form from '@/ui/form';
import { create } from '@/lib/queerantatre/questions';
import { Input, Select } from '@/ui';
import { SelectChangeEvent } from '@mui/material';

interface Props {
  categories: TActualCategory[];
}

export default function CreateForm({ categories }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [question, setQuestion] = useState({} as TActualQuestion);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await create(question);
      setQuestion({} as TActualQuestion);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    console.log(name, value);

    setQuestion({ ...question, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit} disabled={submitting}>
      <Input
        label="Text"
        name="text"
        value={question.text}
        onChange={handleChange}
      />
      <Input
        label="Answer"
        name="answer"
        value={question.answer}
        onChange={handleChange}
      />
      <Select
        label="Category"
        name="category"
        value={question.categories.reduce(
          (acc, cat) => `${acc}, ${cat.label}`,
          ''
        )}
        multiple={true}
        onChange={handleSelectChange}
        options={categories.map((category) => ({
          value: category._id.toString(),
          label: category.label
        }))}
      />
    </Form>
  );
}
