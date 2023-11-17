'use server';

import { unstable_noStore as noStore, } from 'next/cache';

import connect from '@/lib//database';
import { ActualCategory } from '@/lib/queerantatre/categories/ActualCategory';

export const getData = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    await connect();
    const data = await ActualCategory.find();
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};
