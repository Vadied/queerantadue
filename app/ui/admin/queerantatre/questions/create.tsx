'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { TActualCategory, TActualQuestion } from '@/types/queerantatre.model';
import Form from '@/ui/form';
import { create } from '@/lib/queerantatre/questions';
import { Input, Select } from '@/ui';

interface Props {
  categories: TActualCategory[];
}

export default function CreateForm({ categories }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [question, setQuestion] = useState({} as TActualQuestion);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await create(question);
    setQuestion({} as TActualQuestion);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setQuestion({ ...question, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        ultiple={true}
        onChange={handleChange}
        options={categories.map((category) => ({
          value: category._id,
          label: category.label
        }))}
      />
    </Form>
  );
}
