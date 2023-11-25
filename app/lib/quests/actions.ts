'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { Adventurers } from './Adventurers';
import { FormState } from '@/types/response.model';
import { admin } from '@/assets/constants/navigation';

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
  isActive: z.boolean(),
  points: z.string()
});

const Create = FormSchema.omit({
  isActive: true,
  points: true
});

const Update = FormSchema.omit({
  name: true,
  surname: true,
  isActive: true
});

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
    const slug = `${name.toLowerCase()}-${surname.toLowerCase()}`;
    await Adventurers.create({
      slug,
      name,
      surname,
      email,
      points: 0,
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

  revalidatePath(admin.quests.href);
  redirect(admin.quests.href);
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    email: formData.get('email'),
    points: formData.get('points')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };

  // Prepare data for insertion into the database
  const { email, points } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await Adventurers.updateOne(
      { slug },
      {
        email,
        points,
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  revalidatePath(admin.quests.href);
  redirect(admin.quests.href);
};

export const toggleData = async (formData: FormData) => {
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await Adventurers.updateOne(
      { slug: formData.get('slug') },
      {
        isActive: false,
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }
  revalidatePath(admin.quests.href);
};

export const addPoint = async (formData: FormData) => {
  const date = new Date().toISOString().split('T')[0];
  try {
    const points = formData.get('points');
    await connect();
    await Adventurers.updateOne(
      { slug: formData.get('slug') },
      {
        $inc: { points: 1 },
        updatedAt: date
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }
  revalidatePath(admin.quests.href);
};
