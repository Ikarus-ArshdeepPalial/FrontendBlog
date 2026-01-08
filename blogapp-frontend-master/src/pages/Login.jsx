import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ikarusImage from '../assets/ikarus-delta.png';
import loginimg from '../assets/login-image.jpg';
import { useAuth } from '../context/Authcontext';
import { login as loginService } from '../services';

export default function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService({ email, password });
            login(data);
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className="relative">
                <img src={loginimg} alt="" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Content on top of overlay */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-white text-5xl font-bold text-center px-4"></h1>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="flex justify-center"><img src={ikarusImage} alt="Ikarus Delta" className='h-15 mt-10 mb-10' /></div>
                    <h2 className="text-2xl font-bold mb-4 flex justify-center">Login to your account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-500 font-sm mb-2">Email Address</label>
                            <input placeholder="Enter your email address" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="password" className="block text-gray-500 font-sm mb-2">Password</label>
                            <input placeholder='Enter your password' type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-[#DA634B] text-white py-2 px-4 rounded-md transition duration-300 cursor-pointer">Login</button>
                    </form>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}