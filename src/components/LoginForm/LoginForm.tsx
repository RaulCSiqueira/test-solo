import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';
import MessageText from '../MessageText/MessageText'

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                username,
                password,
            });

            if (response.data.success) {
                setCookie('user', JSON.stringify({
                    username: response.data.user.firstName,
                    id: response.data.user.id
                }), 1);
                setErrorMessage('')
                setSuccessMessage('Successfully logged in')
                setTimeout(() => {
                    navigate('/')
                }, 500)
            } else {
                setErrorMessage('Your email and password does not match. Please try again.')
            }
        } catch (error: any) {
            setErrorMessage('Your email and password does not match. Please try again.')
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 pb-10 shadow-md rounded-md" style={{ backgroundColor: '#2A5996' }}>
            <h2 className="text-3xl font-semibold mb-4 text-center text-white">Login</h2>
            <form className="flex flex-col space-y-4">
                <label className="flex flex-col">
                    <span className="text-white">Username:</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-white">Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                <button
                    type="button"
                    onClick={handleLogin}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                    Login
                </button>
            </form>
            {successMessage && <MessageText message={successMessage} type='success' />}
            {errorMessage && <MessageText message={errorMessage} type='error' /> }
        </div>
    );
};

export default LoginForm;
