'use client';

import {
  useEffect,
  ReactNode,
  createContext,
  useState,
  useContext
} from 'react';
import { TActualCategory } from '@/types/queerantatre.model';

const initialActualCategories: TActualCategory[] = [];

const Context = createContext({
  categories: initialActualCategories
});

type Props = {
  data: TActualCategory[];
  children: ReactNode;
};
export const QueerantatreProvider = ({ data, children }: Props) => {
  const [categories, setActualCategories] = useState(data);

  useEffect(() => {
    // Fetch the actual categories
    fetch('/api/queerantatre/categories')
      .then((res) => res.json())
      .then((data) => {
        setActualCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const value = { categories };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCategoriesContext = () => useContext(Context);
