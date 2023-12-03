import { NextRequest, NextResponse } from 'next/server';
import { getAllData } from '@/lib/campaign/quests/data';

const handler = async (
  req: Request | NextRequest,
  res: Response | NextResponse
) => {
  const data = await getAllData();
  if (!data) return new Response('Failed to fetch data.');

  return new Response(JSON.stringify(data));
};

export { handler as GET };
