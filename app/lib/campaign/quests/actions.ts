'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { getSlug } from '@/lib/utils';
import { Quests } from './Quests';
import { FormState } from '@/types/response.model';
import { admin } from '@/assets/constants/navigation';

const FormSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please insert a name.'
  }),
  quest: z.string({
    invalid_type_error: 'Please insert an quest.'
  }),
  title: z.string({
    invalid_type_error: 'Please insert a title.'
  }),
  points: z.string()
});

const Create = FormSchema.omit({});

const Update = FormSchema.omit({});

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    name: formData.get('name'),
    quest: formData.get('quest'),
    points: formData.get('points'),
    title: formData.get('title')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.'
    };
  }

  // Prepare data for insertion into the database
  try {
    await connect();
    const { name, quest, points, title } = validatedFields.data;
    const slug = await getSlug(Quests);
    await Quests.create({
      slug,
      name,
      quest,
      title,
      points: points || 1,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create.'
    };
  }

  revalidatePath(admin.campaign.quests.href);
  redirect(admin.campaign.quests.href);
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    name: formData.get('name'),
    quest: formData.get('quest'),
    title: formData.get('title'),
    points: formData.get('points')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };

  // Prepare data for insertion into the database
  const { name, quest, points, title } = validatedFields.data;
  try {
    await connect();
    await Quests.updateOne(
      { slug },
      {
        name,
        quest,
        title,
        points,
      }
    );
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  revalidatePath(admin.campaign.quests.href);
  redirect(admin.campaign.quests.href);
};

export const deleteData = async (formData: FormData) => {
  try {
    await connect();
    await Quests.deleteOne({ _id: formData.get('_id') });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete.' };
  }

  revalidatePath(admin.campaign.quests.href);
};
