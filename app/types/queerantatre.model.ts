
export type TActualCategory = {
    _id: string;
    label: string;
    code: string;
};

export type TActualQuestion = {
    _id: string;
    slug: string;
    text: string;
    answer: string;
    categories: TActualCategory[];
};
