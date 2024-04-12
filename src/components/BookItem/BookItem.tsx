import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from '../ProgressBard/ProgressBar';
import axios from 'axios';
import { BookType, Review } from '../../types/types';
import { useLibraryContext } from '../../context-api/BaseContextApi';
import { getCookie } from '../../utils/cookies';

const BookItem = () => {
    const userCookie = getCookie('user');
    const { book_id } = useParams();
    const { library, toggleLibrary } = useLibraryContext();
    const [book, setBook] = useState<BookType | null>({
        title: '',
        authors: '',
        genre: '',
        pageCount: 0,
        coverImage: '',
        slug: '',
        currentPage: 1,
        reviews: [],
    });
    const cookieUserData = userCookie ? JSON.parse(userCookie) : {};
    const { username = '', id = null } = cookieUserData;
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [localCurrentPage, setLocalCurrentPage] = useState<number | null>(null);
    const [review, setReview] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [userData, setUserData] = useState<any>({ bookProgress: [] });

    useEffect(() => {
        const fetchMultipleData = async () => {
            try {
                const [fetchBookData, fetchUserData] = await Promise.all([
                    axios.get(`http://localhost:4000/books/${book_id}`),
                    axios.get(`http://localhost:4000/user/${id}`)
                ]);
                setBook(fetchBookData.data);
                setUserData(fetchUserData.data);
    
                const matchingBook = fetchUserData.data.bookProgress?.find((book: any) => book.slug === book_id);
    
                setCurrentPage(matchingBook ? matchingBook.currentPage : 0);
            } catch (error: any) {
                console.log(error.message);
            }
        };
    
        fetchMultipleData();
    }, [book_id, id]);

    useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);

    const checkIsInLibrary = (slug: string | undefined) => {
        return library.some((item: any) => item.book === slug);
    };

    const handleAddToLibrary = (event: any) => {
        event.preventDefault();
        toggleLibrary(book?.slug);
    };

    const handleReviewSubmit = async () => {
        try {
            if (review?.length > 1) {
                setReview('');
                setErrorMessage('');
                const author = userCookie !== null ? username : 'Anonymous';
                const newReview: Review = {
                    author: author,
                    review: review,
                };
                setBook((prevBook) => ({
                    ...prevBook!,
                    reviews: [...(prevBook?.reviews || []), newReview],
                }));

                await axios.post(`http://localhost:4000/books/${book?.slug}`, {
                    reviews: [...(book?.reviews || []), newReview],
                });
            } else {
                setErrorMessage('Please enter a review with more than 1 character');
            }
        } catch (error: any) {
            console.error('Error updating book:', error.message);
            setErrorMessage('Error updating book');
        }
    };

    const handleInputChange = (value: string) => {
        const parsedValue = parseInt(value, 10) || 0;
        setLocalCurrentPage(parsedValue);
    };

    const handleEnterKeyPress = () => {
        if (localCurrentPage !== null) {
            setCurrentPageWithLimit(localCurrentPage);
            setCurrentPage(localCurrentPage)
        }
    };

    const handleInputBlur = () => {
        if (localCurrentPage !== null && localCurrentPage !== currentPage) {
            setCurrentPageWithLimit(localCurrentPage);
            setCurrentPage(localCurrentPage)
        }
    };

    const setCurrentPageWithLimit = async (value: number) => {
        try {
            const limitedValue = Math.min(value, book?.pageCount as number);

            setErrorMessage('');

            const updatedBookProgress = Array.isArray(userData.bookProgress)
            ? userData.bookProgress
                  ?.filter((item: any) => item.slug !== book?.slug)
                  ?.concat({ slug: book?.slug, currentPage: limitedValue })
            : [{ slug: book?.slug, currentPage: limitedValue }];

            await axios.post(`http://localhost:4000/user/${id}`, {
                bookProgress: updatedBookProgress
            });
            
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                bookProgress: updatedBookProgress
            }));

            setCurrentPage(limitedValue);
        } catch (error: any) {
            console.error('Error updating book:', error.message);
            setErrorMessage('Error updating book');
        }
    };

    const currentPageProgress = localCurrentPage === null ? (userData?.bookProgress?.find((item: any) => item.slug === book?.slug)?.currentPage || 0) : localCurrentPage;
    return (
        <div className='p-6'>
            <div className="max-w-lg bg-white rounded-md overflow-hidden shadow-md p-4 flex relative">
                <img src={book?.coverImage} className="h-50 w-40 object-contain mr-4" alt={book?.title} />
                <div className='w-60'>
                    <div className='absolute top-2 right-2' onClick={handleAddToLibrary} style={{ cursor: 'pointer' }}>
                        <span className='text-yellow-500' style={{ fontSize: '26px' }}>{checkIsInLibrary(book?.slug) ? '★' : '☆'}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{book?.title}</h2>
                    <p className="text-gray-600 mb-2">Author: {book?.authors}</p>
                    <p className="text-gray-600 mb-2">Genre: {book?.genre}</p>
                    <p className="text-gray-600 mb-2">Page Count: {book?.pageCount}</p>
                    <p className="text-gray-600 mb-2">Current Page: {currentPage}</p>
                    <ProgressBar pageCount={book?.pageCount} currentPage={currentPage} />
                </div>
            </div>
            <div className="mt-8 max-w-lg">
                <div className="flex items-end mb-8 ">
                    <span className="mr-2">Current Page:</span>
                    <input
                        type="text"
                        placeholder="Page Progress"
                        aria-label="Page Progress Input"
                        value={localCurrentPage === null ? currentPageProgress : localCurrentPage}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEnterKeyPress();
                            }
                        }}
                        className="border border-gray-300 px-1 w-20"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Write a review"
                    aria-label="Review Input"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="border p-2 w-full mb-2"
                />

                <button onClick={handleReviewSubmit} className="bg-light-blue-100 text-white px-4 py-2">Submit Review</button>
                {errorMessage && (<p className="mt-2 text-xs text-red-500">{errorMessage}</p>)}

                {book && book?.reviews && book?.reviews?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                        {book?.reviews?.map((review: Review, index: number) => (
                            <div key={index} className="mb-2">
                                <p className="text-gray-600">
                                    <span className="font-bold text-xs" style={{ textTransform: 'capitalize' }}>
                                        @{review.author}:
                                    </span>
                                    <span className="ml-1">{review.review}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookItem;
