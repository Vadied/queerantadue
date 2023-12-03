'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { ActualCategory } from '@/lib/queerantatre/categories/ActualCategory';
import { FormState, Reference } from '@/types/response.model';
import { admin } from '@/assets/constants/navigation';

const FormSchema = z.object({
  label: z.string({
    invalid_type_error: 'Please insert a label.'
  }),
  code: z.string({
    invalid_type_error: 'Please insert a code.'
  })
});

const Create = FormSchema.omit({});

const Update = FormSchema.omit({});

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    label: formData.get('label'),
    code: formData.get('code')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create category.'
    };
  }

  // Prepare data for insertion into the database
  const { label, code } = validatedFields.data;
  try {
    await connect();
    await ActualCategory.create({
      label,
      code,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create category.'
    };
  }

  revalidatePath(admin.queerantatre.categories.href);
  redirect(admin.queerantatre.categories.href);
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    label: formData.get('label'),
    code: formData.get('code')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };
  }

  // Prepare data for insertion into the database
  const { label, code } = validatedFields.data;
  try {
    await connect();
    await ActualCategory.updateOne(
      { code: slug },
      {
        label,
        code,
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  revalidatePath(admin.queerantatre.categories.href);
  redirect(admin.queerantatre.categories.href);
};

export const deleteData = async (formData: FormData) => {
  try {
    await connect();
    await ActualCategory.deleteOne({ _id: formData.get('_id') });

    revalidatePath(admin.queerantatre.categories.href);
    return { message: 'Deleted category' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete category.' };
  }
};
