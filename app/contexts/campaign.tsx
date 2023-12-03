'use client';

import { TQuest } from '@/types/campaign.model';
import {
  useEffect,
  ReactNode,
  createContext,
  useState,
  useContext
} from 'react';

const initialQuests: TQuest[] = [];

const Context = createContext({
  quests: initialQuests,
});

type Props = {
  children: ReactNode;
};
export const CampaignProvider = ({ children }: Props) => {
  const [quests, setQuests] = useState(initialQuests);

  const getQuests = async () => {
    try {
      const res = await fetch('/api/campaign/quests');
      const data = await res.json();
      setQuests(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Promise.all([getQuests()]);
  }, []);

  const value = { quests };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCampaignContext = () => useContext(Context);
