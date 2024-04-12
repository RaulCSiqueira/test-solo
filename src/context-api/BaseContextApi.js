import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};

export const LibraryProvider = ({ children }) => {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library') || '[]'));

  const toggleLibrary = (bookSlug) => {
    const isInLibrary = library.some((libraryBook) => libraryBook.book === bookSlug);

    if (isInLibrary) {
      const updatedLibrary = library.filter((libraryBook) => libraryBook.book !== bookSlug);
      setLibrary(updatedLibrary);
      localStorage.setItem('library', JSON.stringify(updatedLibrary));
    } else {
      const updatedLibrary = [...library, { book: bookSlug }];
      setLibrary(updatedLibrary);
      localStorage.setItem('library', JSON.stringify(updatedLibrary));
    }
  };

  return (
    <LibraryContext.Provider value={{ library, toggleLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};
