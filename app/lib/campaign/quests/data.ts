import { unstable_noStore as noStore } from 'next/cache';

import connect from '@/lib/database';
import { Quests } from './Quests';

import { ITEMS_PER_PAGE } from '@/assets/constants';
import { TQuest } from '@/types/campaign.model';

export const getAllData = async () => {
  noStore();
  try {
    await connect();
    const data: TQuest[] | null = await Quests.find().lean();
    if (!data) return [];

    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

export const getData = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data: TQuest | null = await Quests.findOne({ slug }).lean();
    if (!data) return null;

    return {
      ...data,
      _id: data._id?.toString()
    };
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

    const getData: Promise<TQuest[]> = Quests.find(condition)
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .sort({ updatedAt: -1 })
      .lean();

    const getCount = Quests.countDocuments(condition);

    const [data, count] = await Promise.all([getData, getCount]);

    return {
      data: data.map((d) => ({ ...d, _id: d._id.toString() })),
      totalPages: Math.ceil(Number(count) / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {};
  }
};
