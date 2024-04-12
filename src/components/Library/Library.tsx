import React, { useState, useEffect } from 'react';
import BookItemCard from '../BookItemCard/BookItemCard';
import { useLibraryContext } from '../../context-api/BaseContextApi';
import { BookType } from '../../types/types';
import axios from 'axios'
import { getCookie } from '../../utils/cookies';

type UserDataType = {
    slug: string;
    currentPage: number;
}

type TopBookType = {
    progress: number;
    title: string;
    slug: string
}

const Library = () => {
    const [bookData, setBookData] = useState<BookType[]>([]);

    const userCookie = getCookie('user');
    const cookieUserData = userCookie ? JSON.parse(userCookie) : {};
    const { username = '', id = null } = cookieUserData;

    const { library } = useLibraryContext();
    const [topRatedBooks, setTopRatedBooks] = useState([]);

    useEffect(() => {
        const fetchMultipleData = async () => {
            try {
                const [fetchBookData, fetchUserData] = await Promise.all([
                    axios.get(`http://localhost:4000/books/`),
                    axios.get(`http://localhost:4000/user/${id}`)
                ]);
                setBookData(fetchBookData.data);

                const sortedBooks = fetchUserData?.data?.bookProgress?.map((userBook: UserDataType) => {
                    const matchingBook = fetchBookData?.data?.find((book: BookType) => book.slug === userBook.slug)
                    if (matchingBook) {
                        const progress = (userBook.currentPage / matchingBook.pageCount) * 100;
                        return { ...{ title: matchingBook.title, slug: matchingBook.slug }, progress: Math.round(progress) };
                    }
                    return null
                }).sort((a: TopBookType, b: TopBookType) => b.progress - a.progress)
                setTopRatedBooks(sortedBooks)
            } catch (error: any) {
                console.log(error.message);
            }
        };

        fetchMultipleData();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Library</h2>
            {library?.length === 0 ? (
                <p className="text-gray-500 text-md mt-2">Library is empty.</p>
            ) : (
                <div className="flex flex-wrap -mx-2">
                    {library?.map((libraryBook: any, index: number) => {
                        const matchingBook = bookData?.find((book: any) => book?.slug === libraryBook?.book);
                        return matchingBook ? (
                            <BookItemCard
                                key={index}
                                book={matchingBook}
                                index={index}
                            />
                        ) : null;
                    })}
                </div>
            )}
            {topRatedBooks?.length > 0 ? (
                <div className='mt-4'>
                    <h3 className="text-xl font-semibold mb-2">{`Top ${topRatedBooks?.length} Most Progressed Books Information`}</h3>
                    <ul className="text-sm list-disc pl-4">
                        {topRatedBooks?.map((book: any, index: number) => (
                            <li key={index} className="mb-1">
                                {book.title} - {book.progress}% progress
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

        </div>
    );
};

export default Library;
