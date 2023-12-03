'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connect from '@/lib//database';
import { Adventurers } from './Adventurers';
import { FormState } from '@/types/response.model';
import { admin } from '@/assets/constants/navigation';
import { getSlug } from '@/lib/utils';

const FormSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please insert a name.'
  }),
  surname: z.string({
    invalid_type_error: 'Please insert an surname.'
  }),
  character: z.string({
    invalid_type_error: 'Please insert a character.'
  }),
  quests: z.string()
});

const Create = FormSchema.omit({});

const Update = FormSchema.omit({
  name: true,
  surname: true
});

export const create = async (prevState: FormState, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = Create.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    character: formData.get('character'),
    quests: formData.get('quests')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.'
    };
  }

  // Prepare data for insertion into the database
  const { name, surname, character, quests } = validatedFields.data;
  try {
    await connect();
    const slug = await getSlug(Adventurers);
    await Adventurers.create({
      slug,
      name,
      surname,
      quests,
      character
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create.'
    };
  }

  revalidatePath(admin.campaign.knights.href);
  redirect(admin.campaign.knights.href);
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  // Validate form fields using Zod
  const validatedFields = Update.safeParse({
    character: formData.get('character'),
    quests: formData.get('quests')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };

  // Prepare data for insertion into the database
  const { character, quests } = validatedFields.data;
  try {
    await connect();
    await Adventurers.updateOne(
      { slug },
      {
        character,
        quests: quests.split(','),
      }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  revalidatePath(admin.campaign.knights.href);
  redirect(admin.campaign.knights.href);
};

export const deleteData = async (formData: FormData) => {
  try {
    await connect();
    await Adventurers.deleteOne({ _id: formData.get('_id') });
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Delete.' };
  }
  revalidatePath(admin.queerantatre.categories.href);
};
