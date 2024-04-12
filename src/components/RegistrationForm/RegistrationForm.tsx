import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageText from '../MessageText/MessageText';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (password !== repeatPassword) {
                setPasswordMatchError(true);
                return;
            }

            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    dob,
                    password
                }),
            });

            if (response.ok) {
                setErrorMessage('')
                setSuccessMessage('Registered successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 500)
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error: any) {
            setErrorMessage('Error during registration');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 rounded-md" style={{ backgroundColor: '#2A5996' }}>
            <h2 className="text-3xl font-semibold mb-4 text-center text-white">Registration</h2>
            <form className="flex flex-col space-y-4">
                <label className="flex flex-col">
                    <span className="text-white">First Name:</span>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-white">Last Name:</span>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-white">Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-white">Date of Birth:</span>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
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
                <label className="flex flex-col">
                    <span className="text-white">Repeat Password:</span>
                    <input
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
                            setPasswordMatchError(false);
                        }}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </label>
                {passwordMatchError && <p className="text-red-500">Passwords do not match</p>}
                <button
                    type="button"
                    onClick={handleRegister}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                    Register
                </button>
            </form>
            {successMessage && <MessageText message={successMessage} type='success' />}
            {errorMessage && <MessageText message={errorMessage} type='error' />}
        </div>
    );
};

export default RegistrationForm;
