'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib/database';
import { ActualQuestion } from './ActualQuestion';
import { FormState } from '@/types/response.model';
import { createSlug } from '@/lib/utils';

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count = await ActualQuestion.countDocuments({ slug });
  if (!Number(count)) return slug;

  return getSlug();
};

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

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    text: formData.get('text'),
    answer: formData.get('answer'),
    categories: formData.get('categories')
  });

  console.log('create', formData.get('text'));
  console.log('create', formData.get('answer'));
  console.log('create', formData.get('categories'));

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create question.'
    };
  }

  // Prepare data for insertion into the database
  const { text, answer, categories } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();

    const slug = await getSlug();
    await ActualQuestion.create({
      slug,
      text,
      answer,
      categories,
      createdAt: date,
      updatedAt: date
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create.'
    };
  }

  revalidatePath('/admin/queerantatre/questions');
  redirect('/admin/queerantatre/questions');
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    text: formData.get('text'),
    answer: formData.get('answer'),
    categories: formData.get('categories')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };
  }

  // Prepare data for insertion into the database
  const { text, answer, categories } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await ActualQuestion.updateOne(
      { slug },
      {
        text,
        answer,
        categories,
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

export const deleteData = async (formData: FormData) => {
  try {
    await connect();
    await ActualQuestion.deleteOne({ _id: formData.get('_id') });

    revalidatePath('/admin/queerantatre/questions');
    return { message: 'Deleted' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete category.' };
  }
};
