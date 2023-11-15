'use server';

import { z } from 'zod';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { ActualCategory } from '@/models/ActualCategory';
import { FormState, Reference } from '@/types/response.model';

export const getData = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    await connect();
    const data = await ActualCategory.find();
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

const FormSchema = z.object({
  _id: z.string(),
  label: z.string({
    invalid_type_error: 'Please insert a label.'
  })
});

const Create = FormSchema.omit({});

const Update = FormSchema.omit({});

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    label: formData.get('label')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create category.'
    };
  }

  // Prepare data for insertion into the database
  const { label } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await ActualCategory.create({
      label,
      createdAt: date,
      updatedAt: date
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create category.'
    };
  }

  revalidatePath('/admin/queerantatre/categories');
  redirect('/admin/queerantatre/categories');
};

export const update = async (
  ref: Reference,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    label: formData.get('label')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update category.'
    };
  }

  // Prepare data for insertion into the database
  const { label } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await ActualCategory.updateOne(
      { _id: ref._id },
      {
        label,
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update category.'
    };
  }

  revalidatePath(`/admin/queerantatre/categories`);
  redirect(`/admin/queerantatre/categories`);
};

export const deleteData = async (_id: string) => {
  try {
    await connect();
    await ActualCategory.deleteOne({ _id });

    revalidatePath('/admin/queerantatre/categories');
    return { message: 'Deleted category' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete category.' };
  }
};
