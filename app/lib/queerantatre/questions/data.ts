'use server';

import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib//database';
import { ActualQuestion } from '@/lib/queerantatre/questions/ActualQuestion';
import { TActualQuestion } from '@/types/queerantatre.model';

import { ITEMS_PER_PAGE } from '@/assets/constants';

export const getData = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data: TActualQuestion | null = await ActualQuestion.findOne({ slug });
    if (!data) return null;

    return {
      ...data,
      _id: data._id?.toString(),
      categories: data.categories.map((c: string) => c.toString())
    };
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
};

export const getAllData = async () => {
  noStore();
  try {
    await connect();
    const data: TActualQuestion[] = await ActualQuestion.find().lean();
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
      text: { $regex: new RegExp(query, 'i') }
    };
    const getData: Promise<TActualQuestion[]> = ActualQuestion.find(condition, {
      text: true,
      slug: true,
      categories: true,
      answer: true
    })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .sort({ updatedAt: -1 })
      .lean();

    const getCount = ActualQuestion.countDocuments(condition);

    const [data, count] = await Promise.all([getData, getCount]);

    return {
      data: data.map((d) => ({
        ...d,
        _id: d._id.toString(),
        categories: d.categories.map((c: string) => c.toString())
      })),
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
