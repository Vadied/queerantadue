import { NextRequest, NextResponse } from 'next/server';
import { getAllData } from '@/lib/queerantatre/categories/data';
import connect from '@/lib/database';

import questions from '@/assets/constants/seeds/actualQuestions';
import { ActualQuestion } from '@/lib/queerantatre/questions/ActualQuestion';
import actualcategories from '@/assets/constants/seeds/actualCategories';
import { getSlug } from '@/lib/utils';
import { ActualCategory } from '@/lib/queerantatre/categories/ActualCategory';

const handler = async (
  req: Request | NextRequest,
  res: Response | NextResponse
) => {
  try {
    connect();
    await Promise.all(actualcategories.map(cat => {
      return ActualCategory.create(cat)
    }))
    
    const categories = await getAllData();

    const dataCat = categories.map((category) => {
      return {
        code: category.code,
        _id: category._id
      };
    });

    const data = questions
      .map((question) => {
        return {
          ...question,
          categories: question.categories.map((category) => {
            const cat = dataCat.find((c) => c.code === category);
            if (!cat) return null;

            return cat._id.toString();
          })
        };
      })
      .filter((c) => !!c);

    const createData = async (q: any, index: number) => {
      const slug = await getSlug(ActualQuestion);
      return ActualQuestion.create({
        slug,
        text: q.text,
        answer: q.answer,
        categories: q.categories
      });
    };

    const promises = data.map(createData);

    Promise.all(promises);

    return new Response('successo');
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return new Response('Failed to fetch data.');
  }
};

export { handler as GET };
