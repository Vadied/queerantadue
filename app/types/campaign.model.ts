export type TAdventurer = {
  _id: string;
  slug: string;
  character: string;
  name: string;
  surname: string;
  quests: string[];
  createdAt: string;
  updatedAt: string;
};

export type TQuest = {
  _id: string;
  name: string;
  slug: string;
  quest: string;
  title: string;
  points: string;
  createdAt: string;
  updatedAt: string;
};
