'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib/database';
import { TActualQuestion } from '@/types/queerantatre.model';
import { ActualQuestion } from './ActualQuestion';

const FormSchema = z.object({
  text: z.string({
    invalid_type_error: 'Please insert a text.'
  }),
  answer: z.string({
    invalid_type_error: 'Please insert an answer.'
  }),
  categories: z.array(z.string())
});

const Create = FormSchema.omit({});

const Update = FormSchema.omit({});

export const create = async (formData: TActualQuestion) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse(formData);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create question.'
    };
  }

  // Prepare data for insertion into the database
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await ActualQuestion.create({
      ...validatedFields.data,
      createdAt: date,
      updatedAt: date
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create question.'
    };
  }

  revalidatePath('/admin/queerantatre/questions');
  redirect('/admin/queerantatre/questions');
};

export const update = async (formData: TActualQuestion) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse(formData);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update question.'
    };
  }

  // Prepare data for insertion into the database
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await ActualQuestion.updateOne(
      { _id: formData._id },
      {
        ...validatedFields.data,
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update question.'
    };
  }

  revalidatePath('/admin/queerantatre/questions');
  redirect('/admin/queerantatre/questions');
};

export const deleteData = async (_id: string) => {
  try {
    await connect();
    await ActualQuestion.deleteOne({ _id });

    revalidatePath('/admin/queerantatre/questions');
    return { message: 'Deleted question' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete question.' };
  }
};
