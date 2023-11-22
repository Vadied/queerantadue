import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib/database';
import { ActualCategory } from './ActualCategory';

import { ITEMS_PER_PAGE } from '@/assets/constants';
import { TActualCategory } from '@/types/queerantatre.model';

export const getData = async (code: string) => {
  noStore();
  try {
    await connect();
    const data = await ActualCategory.findOne({ code }).lean();
    if (!data) return null;

    return { ...data, _id: data._id?.toString() } as TActualCategory;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

export const getAllData = async () => {
  noStore();
  try {
    await connect();
    const data = await ActualCategory.find().lean();
    if (!data) return [];

    return data as TActualCategory[];
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return {};

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const condition = {
      $or: [
        { label: { $regex: new RegExp(query, 'i') } },
        { code: { $regex: new RegExp(query, 'i') } }
      ]
    };
    const data = await ActualCategory.find(condition)
      .skip(offset)
      .limit(ITEMS_PER_PAGE);
    const count = await ActualCategory.countDocuments(condition);

    return {
      data: data as TActualCategory[],
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
