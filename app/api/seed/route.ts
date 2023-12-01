import { NextApiRequest, NextApiResponse } from 'next';
import { getAllData } from '@/lib/queerantatre/categories/data';
import connect from '@/lib/database';

import questions from '@/assets/constants/seeds/actualQuestions';
import { ActualQuestion } from '@/lib/queerantatre/questions/ActualQuestion';
import { createSlug } from '@/lib/utils';

const getSlug = async (): Promise<string> => {
  const slug = createSlug();
  const count = await ActualQuestion.countDocuments({ slug });
  if (!Number(count)) return slug;

  return getSlug();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    connect();
    const categories = await getAllData();

    const dataCat = categories.map((category) => {
      return {
        code: category.code,
        _id: category._id
      };
    });

    const data = questions.map((question) => {
      return {
        ...question,
        categories: question.categories.map((category) => {
          const cat = dataCat.find((c) => c.code === category);
          if (!cat) return null;

          return cat._id.toString();
        })
      };
    });

    const createData = async (q: any, index: number) => {
        console.log('index', index)
          const slug = await getSlug();
          return ActualQuestion.create({
            slug,
            text: q.text,
            answer: q.answer,
            categories: q.categories
          });
      }

    const promises = data.map(createData);

    Promise.all(promises);

    return new Response('successo');
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return new Response('Failed to fetch data.');
  }
};

export { handler as GET };
