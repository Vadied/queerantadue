import { NextApiRequest, NextApiResponse } from 'next';
import { getAllData } from '@/lib/queerantatre/categories/data';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getAllData();
  if (!data) return new Response('Failed to fetch data.');

  return new Response(JSON.stringify(data));
};

export { handler as GET };
