import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';
import { useLibraryContext } from '../../context-api/BaseContextApi';
import { BookType } from '../../types/types';
import axios from 'axios'
import ProgressBar from '../ProgressBard/ProgressBar';

type BookItemPropType = {
    book: BookType
    index: number
}

type UserBookProgress = {
    slug: string;
    currentPage: number;
}

const BookItemCard = ({ book, index }: BookItemPropType) => {
    const { library, toggleLibrary } = useLibraryContext();
    const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('user'));
    const [isInLibrary, setIsInLibrary] = useState(false);
    const [currentPage, setCurrentPage] = useState<number | null>(null);

    const userCookie = getCookie('user');
    const cookieUserData = userCookie ? JSON.parse(userCookie) : {};
    const { id = null } = cookieUserData;

    useEffect(() => {
        if (!isLoggedIn) return
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/${id}`);    
                const matchingBook = response.data.bookProgress?.find((bookItem: UserBookProgress) => book.slug === bookItem?.slug);
    
                setCurrentPage(matchingBook ? matchingBook.currentPage : 0);
            } catch (error: any) {
                console.log(error.message);
            }
        };
    
        fetchUserData();
    }, []);
    useEffect(() => {
        setIsInLibrary(library?.some((item: any) => item.book === book?.slug));
    }, [book?.slug, library]);

    const truncateText = (text: string, maxLength: number) => {
        return text?.length <= maxLength ? text : text?.slice(0, maxLength) + '...';
    };

    const handleLibraryToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        toggleLibrary(book?.slug);
        setIsInLibrary(!isInLibrary);
    };

    const renderStarIcon = () => {
        if (!isLoggedIn) return null;

        return (
            <div className='absolute top-0 right-0' onClick={handleLibraryToggle} style={{ cursor: 'pointer' }}>
                <span className='text-yellow-500' style={{ fontSize: '26px' }}>{isInLibrary ? '★' : '☆'}</span>
            </div>
        );
    };

    const renderProgressIndicator = () => {
        if (!isLoggedIn) return null;

        return (
            <div className='flex items-center px-3'>
                <ProgressBar pageCount={book?.pageCount} currentPage={currentPage} />
            </div>
        );
    };

    const listBooksElements = () => {
        return (
            <div data-testid="book-item-card" className="min-h-80 h-80 max-w-xs bg-white rounded-md overflow-hidden shadow-md relative">
                <img src={book.coverImage} className="h-40 w-30 mx-auto" alt={book.title} loading="lazy" />
                <div className="p-3 flex-1 flex flex-col justify-between">
                    <strong className="block text-sm font-semibold mb-1 h-16 overflow-hidden">{truncateText(book.title, 50)}</strong>
                    <div>
                        <p className="text-gray-600 text-xs mb-1">Genre: {book.genre}</p>
                        <p className="text-gray-600 text-xs">Page Count: {book.pageCount}</p>
                    </div>
                </div>
                {renderStarIcon()}
                {renderProgressIndicator()}
            </div>
        )
    }

    return (
        <div key={index} className="w-full xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 px-3 mb-8 h-250">
            {isLoggedIn ? (
                <Link to={`/books/${book?.slug}`} className="block">
                    {listBooksElements()}
                </Link>
            ) : (
                <Link to={'/login'}>
                    {listBooksElements()}
                </Link>
            )}
        </div>
    );
};

export default BookItemCard;
