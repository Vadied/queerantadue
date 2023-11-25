'use server';

import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib//database';
import { ActualQuestion } from '@/lib/queerantatre/questions/ActualQuestion';
import { TActualQuestion } from '@/types/queerantatre.model';

import { ITEMS_PER_PAGE } from '@/assets/constants';
import { ActualCategory } from '../categories/ActualCategory';

const parseCategories = (
  categories: { _id: string; label: string }[],
  ids: string[]
) => {
  if (!ids.length) return ['Nessuna'];

  return ids.map((id: string) => {
    const category = categories.find((c) => id.toString() === c._id.toString());
    if (!category) return '';

    return category.label;
  });
};

export const getData = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data = await ActualQuestion.findOne({ slug });
    if (!data) return null;

    return {
      ...data,
      _id: data._id?.toString(),
      categories: data.categories.map((c: string) => c.toString())
    } as TActualQuestion;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
};

export const getAllData = async () => {
  noStore();
  try {
    await connect();
    const data = await ActualQuestion.find().lean();
    if (!data) return [];

    return data as TActualQuestion[];
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
    const getData = ActualQuestion.find(condition, {
      text: true,
      slug: true,
      categories: true,
      answer: true
    })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .sort({ updatedAt: -1 })
      .lean();

    const getCategories = ActualCategory.find({}, '_id label');

    const getCount = ActualQuestion.countDocuments(condition);

    const [data, categories, count] = await Promise.all([
      getData,
      getCategories,
      getCount
    ]);

    return {
      data: data.map((d) => ({
        ...d,
        _id: d._id?.toString(),
        categories: parseCategories(categories, d.categories)
      })) as TActualQuestion[],
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
