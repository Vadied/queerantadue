'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { User } from './User';
import { FormState } from '@/types/response.model';
import connect from '@/lib//database';
import { createSlug } from '@/lib/utils';
import { admin, login } from '@/assets/constants/navigation';

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
  const validatedFields = Create.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    email: formData.get('email')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.'
    };
  }

  const { name, surname, email } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    const slug = await getSlug();
    User.create({
      slug,
      name,
      surname,
      email,
      isActive: true,
      createdAt: date,
      updatedAt: date
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.'
    };
  }

  revalidatePath(admin.users.href);
  redirect(admin.users.href);
};

export const update = async (
  slug: string,
  prevState: FormState,
  formData: FormData
) => {
  const validatedFields = Update.safeParse({
    email: formData.get('email')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.'
    };
  }

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

  revalidatePath(admin.users.href);
  redirect(admin.users.href);
};

export const toggleUser = async (formData: FormData) => {
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    await User.updateOne(
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
  revalidatePath(admin.users.href);
};

const LoginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Please insert an email.'
  }),
  password: z.string({
    invalid_type_error: 'Please insert a password.'
  })
});

export const addCredentials = async (
  prevState: FormState,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campi mancanti. Impossibile registrare le credenziali.'
    };
  }

  const { email, password } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  try {
    await connect();
    const user = await User.findOne({ email });
    if (!user)
      return {
        message:
          "La tua email non è autorizzata, fai richiesta all'amministratore"
      };

    if (user.password)
      return {
        message: 'Utente già registrato, fail il login per cambiare credenziali'
      };

    user.password = password;
    user.updatedAt = date;
    await user.save();
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update.'
    };
  }

  redirect(login.href);
};

// export const credentialSignIn = async (
//   prevState: FormState,
//   formData: FormData
// ) => {
//   const validatedFields = LoginSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password')
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Campi mancanti. Impossibile registrare le credenziali.'
//     };
//   }

//   const { email, password } = validatedFields.data;
//   await signIn('credentials', {
//     email,
//     password,
//     callbackUrl: '/admin'
//   });
//   try {
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Update.'
//     };
//   }

//   redirect(admin.href);
// };
