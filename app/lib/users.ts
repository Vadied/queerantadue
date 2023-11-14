import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib//database';

import { User } from '@/models/User';
import { TUser } from '@/types/user';

export const getUserByName = async (search: string) => {
  noStore();
  try {
    await connect();
    const regex = new RegExp(`/${search}/`);
    const data = await User.findOne({ name: regex });
    return data as TUser[];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};

export const getUser = async (email: string) => {
  noStore();
  try {
    await connect();
    const data = await User.findOne({ email });
    return data as TUser;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};
