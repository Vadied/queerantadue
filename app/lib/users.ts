import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib//database';

import { User } from '@/models/User';
import { TUser } from '@/types/user';

import { ITEMS_PER_PAGE } from '@/assets/constants';

export const getUserByName = async (search: string) => {
  // Add noStore() here prevent the response from being cached.
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

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return [];

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const data = await User.find({ text: { $regex: query } })
      .skip(offset)
      .limit(ITEMS_PER_PAGE);

    return data as TUser[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchTotalPages = async (query: string) => {
  try {
    await connect();
    const count = await User.countDocuments({ name: { $regex: query } });
    return Math.ceil(Number(count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    return 0;
  }
};
