import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib/database';
import { Adventurers } from './Adventurers';

import { ITEMS_PER_PAGE } from '@/assets/constants';
import { TAdventurer } from '@/types/adventurer';

export const getData = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data = await Adventurers.findOne({ slug }).lean();
    if (!data) return null;

    return {
      ...data,
      _id: data._id?.toString()
    } as TAdventurer;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return {};

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const condition = {
      name: { $regex: new RegExp(query, 'i') }
    };

    const getData = Adventurers.find(condition)
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .sort({ updatedAt: -1 })
      .lean();

    const getCount = Adventurers.countDocuments(condition);

    const [data, count] = await Promise.all([getData, getCount]);

    return {
      data: data as TAdventurer[],
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
