'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { User } from './User';
import { FormState } from '@/types/response.model';
import { createSlug } from '../utils';

const FormSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please insert a name.'
  }),
  surname: z.string({
    invalid_type_error: 'Please insert an surname.'
  }),
  email: z.string({
    invalid_type_error: 'Please insert an email.'
  }),
  isActive: z.string({
    invalid_type_error: 'Please insert an isActive.'
  })
});

const Create = FormSchema.omit({
  isActive: true
});

const Update = FormSchema.omit({
  name: true,
  surname: true,
  isActive: true
});

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count = await User.countDocuments({ slug });
  if (!Number(count)) return slug;

  return getSlug();
};

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    email: formData.get('email')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.'
    };
  }

  // Prepare data for insertion into the database
  const { name, surname, email } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();

    const slug = await getSlug();
    await User.create({
      slug,
      name,
      surname,
      email,
      isActive: true,
      createdAt: date,
      updatedAt: date
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create.'
    };
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {

  console.log('slug', slug);

  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    email: formData.get('email')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };
  }

  // Prepare data for insertion into the database
  const { email } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await User.updateOne(
      { slug },
      {
        email,
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  revalidatePath('/admin/users');
  redirect('/admin/users');
};

export const toggleUser = async (formData: FormData) => {
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await User.updateOne(
      { slug: formData.get('slug') },
      {
        isActive: !formData.get('isActive'),
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }
  revalidatePath('/admin/users');
};
