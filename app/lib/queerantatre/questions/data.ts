'use server';

import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib//database';
import { ActualQuestion } from '@/lib/queerantatre/questions/ActualQuestion';
import { TActualQuestion } from '@/types/queerantatre.model';

import { ITEMS_PER_PAGE } from '@/assets/constants';

export const getData = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    await connect();
    const data = await ActualQuestion.find();
    return data as TActualQuestion[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const getDataFiltered = async (query: string, currentPage: number) => {
  if (currentPage < 1) return [];

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const data = await ActualQuestion.find({ text: { $regex: query } })
      .skip(offset)
      .limit(ITEMS_PER_PAGE);

    return data as TActualQuestion[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchTotalPages = async (query: string) => {
  try {
    await connect();
    const count = await ActualQuestion.countDocuments({
      name: { $regex: query }
    });
    return Math.ceil(Number(count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    return 0;
  }
};
