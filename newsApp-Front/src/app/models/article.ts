// export interface Article {
//     id: number;
//     title: string;
//     description: string;
//     author: string;
//     category: string;
//     url: string;
//     imageUrl: string;
//     published_date: string;
// }

export interface Response {
    count: number;
    next?: string;
    previous?: string;
    results: Article[];
}

export interface Article {
    id: number;
    title: string;
    description: null | string;
    author: string;
    category: string;
    url: string;
    imageUrl: null | string;
    published_date: string;
    country: string;
}