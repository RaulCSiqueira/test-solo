export type BookType = {
    title: string;
    authors: string;
    genre: string;
    pageCount: number;
    coverImage: string;
    slug: string;
    currentPage: number;
    reviews: Review[];
    progress?: number | undefined;
}

export type Review = {
    author: string;
    review: string;
}
