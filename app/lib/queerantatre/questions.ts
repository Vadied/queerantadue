'use server';

import { z } from 'zod';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { ActualQuestion } from '@/models/ActualQuestion';
import { TActualQuestion } from '@/types/queerantatre.model';

import { ITEMS_PER_PAGE } from '@/assets/constants';

export const getData = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    await connect();
    const data = await ActualQuestion.find();
    return data as TActualQuestion[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return [];

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const data = await ActualQuestion.find({ text: { $regex: query } })
      .skip(offset)
      .limit(ITEMS_PER_PAGE);

    return data as TActualQuestion[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchTotalPages = async (query: string) => {
  try {
    await connect();
    const count = await ActualQuestion.countDocuments({ name: { $regex: query } });
    return Math.ceil(Number(count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    return 0;
  }
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
