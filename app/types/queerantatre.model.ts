
export type TActualCategory = {
    _id: number;
    label: string;
    code: string;
};

export type TActualQuestion = {
    _id: number;
    text: string;
    answer: string;
    categories: TActualCategory[];
};
