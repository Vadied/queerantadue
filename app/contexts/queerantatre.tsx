'use client';

import {
  useEffect,
  ReactNode,
  createContext,
  useState,
  useContext
} from 'react';
import { TActualCategory, TActualQuestion } from '@/types/queerantatre.model';

const initialActualCategories: TActualCategory[] = [];

const Context = createContext({
  categories: initialActualCategories,
});

type Props = {
  children: ReactNode;
};
export const QueerantatreProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState(initialActualCategories);

  const getCategories = () => {
    return fetch('/api/queerantatre/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    Promise.all([getCategories()]);
  }, []);

  const value = { categories };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useQueerantatreContext = () => useContext(Context);
