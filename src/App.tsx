import React, { lazy, Suspense } from 'react';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getCookie } from './utils/cookies';

import BookItem from './components/BookItem/BookItem'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import LoginForm from './components/LoginForm/LoginForm'

const Home = lazy(() => import('./pages/Home/Home'));
const Library = lazy(() => import('./components/Library/Library'));

interface PrivateRouteProps {
    element: React.ReactElement;
}

function PrivateRoute({ element }: PrivateRouteProps) {
    const isUserLoggedIn = getCookie('user');
    return isUserLoggedIn ? element : <Navigate to="/" replace />;
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense 
                    fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full border-t-4 border-gray-300 border-solid border-8 h-16 w-16"></div></div>}>
                    <Header />
                    <div className='min-h-screen'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/library/*" element={<PrivateRoute element={<Library />} />} />
                            <Route path="/books/:book_id" element={<BookItem />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegistrationForm />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                    <Footer />
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
