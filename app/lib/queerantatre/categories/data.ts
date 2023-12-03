import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib/database';
import { ActualCategory } from './ActualCategory';

import { ITEMS_PER_PAGE } from '@/assets/constants';
import { TActualCategory } from '@/types/queerantatre.model';

export const getData = async (code: string) => {
  noStore();
  try {
    await connect();
    const data: TActualCategory | null = await ActualCategory.findOne({
      code
    }).lean();
    if (!data) return null;

    return { ...data, _id: data._id?.toString() };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

export const getAllData = async () => {
  noStore();
  try {
    await connect();
    const data: TActualCategory[] = await ActualCategory.find().lean();
    if (!data) return [];

    return data;
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
    const getData: Promise<TActualCategory[]> = ActualCategory.find(condition)
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .sort({ updatedAt: -1 })
      .lean();

    const getCount = ActualCategory.countDocuments(condition);

    const [data, count] = await Promise.all([getData, getCount]);

    return {
      data,
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
