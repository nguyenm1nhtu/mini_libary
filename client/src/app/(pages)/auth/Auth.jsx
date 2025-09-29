'use client';

import React, { useState } from 'react';
import api from '@/utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Auth({ isOpen, onClose, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await api.post('api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });

                const userData = response.data.data;
                localStorage.setItem('user', JSON.stringify(userData));

                onLogin(userData);

                setFormData({ username: '', email: '', password: '', role: 'user' });
            } else {
                await api.post('api/auth/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                });

                setIsLogin(true);
                setFormData({ username: '', email: '', password: '', role: 'user' });
                setError('');
            }
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra');
            console.error('Auth error:', err);
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            setIsLogin(true);
            setError('');
            onClose();
        }
    };

    const handleCloseModal = () => {
        setIsLogin(true);
        setError('');
        setFormData({ username: '', email: '', password: '', role: 'user' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-backdrop fixed inset-0 bg-black flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={handleBackgroundClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-3 text-gray-500 hover:opacity-80 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-[18px]" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {!isLogin && (
                        <div className="flex flex-col gap-1">
                            <span className="text-[16px] font-[500]">Tên đăng nhập</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Tên đăng nhập"
                                className="border rounded-lg p-2"
                                required
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <span className="text-[16px] font-[500]">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[16px] font-[500]">Mật khẩu</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Mật khẩu"
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="flex flex-col gap-1">
                            <span className="text-[16px] font-[500]">Vai trò</span>
                            <div className="flex gap-2 ">
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('user')}
                                    className={`flex-1 p-2 rounded-lg border text-center ${
                                        formData.role === 'user' ? 'bg-[#77DD77] text-white' : 'bg-white text-gray-700'
                                    } hover:bg-[#77DD77]/80 hover:text-white cursor-pointer`}
                                >
                                    Người đọc
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleChange('admin')}
                                    className={`flex-1 p-2 rounded-lg border text-center ${
                                        formData.role === 'admin' ? 'bg-[#77DD77] text-white' : 'bg-white text-gray-700'
                                    } hover:bg-[#77DD77]/80 hover:text-white cursor-pointer`}
                                >
                                    Quản lý
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-[var(--primary)] text-white rounded-lg p-2 hover:bg-[var(--primary)]/80 my-2 cursor-pointer"
                    >
                        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-[var(--primary)] ml-1 hover:underline cursor-pointer"
                    >
                        {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                    </button>
                </p>
            </div>
        </div>
    );
}
