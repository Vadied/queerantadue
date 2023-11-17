import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib/database';
import { User } from './User';
import { TUser } from '@/types/user';

import { ITEMS_PER_PAGE } from '@/assets/constants';

export const getUser = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data = await User.findOne({ slug }).lean();
    if (!data) return null;

    return { ...data, _id: data._id?.toString() } as TUser;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return {};

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const data = await User.find({
      name: { $regex: new RegExp(query, 'i') },
      isActive: true
    })
      .skip(offset)
      .limit(ITEMS_PER_PAGE);

    const count = await User.countDocuments({ name: { $regex: query } });

    return {
      data: data as TUser[],
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
