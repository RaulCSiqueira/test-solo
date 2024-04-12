import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';

type UserCookieDataType = {
    username: string,
    id: number
}

const Header = () => {
    const userCookie = getCookie('user');
    const navigate = useNavigate();
    const handleLogout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
        window.location.reload();
    };
    const userData = userCookie ? JSON.parse(userCookie) : {};
    const { username = '', id = null } = userData;

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="mr-4">Home</Link>
                {userCookie && (
                    <Link to="/library" className="mr-4">Library</Link>
                )}
            </div>
            <div className="flex items-center">
                {userCookie ? (
                    <>
                        <span className="mr-4" style={{ textTransform: 'capitalize' }}>{username}</span>
                        <button onClick={handleLogout} className="mr-4">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4">Login</Link>
                        <Link to="/register" className="mr-4">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
