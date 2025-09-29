'use client';

import React, { useEffect, useState, useRef } from 'react';
import style from './Header.module.css';
import SearchBar from './search/Search';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import Auth from '../auth/Auth';
import api from '@/utils/axios';

export default function Header() {
    const [login, setLogin] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState({});
    const dropdownRef = useRef(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
            setLogin(true);
        } else {
            setUser({});
            setLogin(false);
            localStorage.removeItem('user');
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogin = (user) => {
        setLogin(true);
        setIsAuthOpen(false);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            setUser({});
            setLogin(false);
            setIsDropdownOpen(false);
        } catch (err) {
            console.error('Lỗi đăng xuất:', err);
            localStorage.removeItem('user');
            setUser({});
            setLogin(false);
            setIsDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <header id="header">
                <div className={style.header}>
                    <div className="flex items-center justify-between w-full h-full">
                        <Link href="/" className="flex gap-[10px] items-center">
                            <svg
                                width="70"
                                height="70"
                                viewBox="0 0 261 261"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="261" height="261" fill="none" />
                                <g filter="url(#filter0_d_0_1)">
                                    <path
                                        d="M188.835 233.08C165.722 245.731 139.123 250.525 113.047 246.74C86.9713 242.955 62.8328 230.796 44.2702 212.096C25.7075 193.396 13.727 169.168 10.1346 143.065C6.54214 116.963 11.5326 90.3993 24.3535 67.38C37.1745 44.3607 57.131 26.1331 81.2148 15.445C105.299 4.75682 132.204 2.18745 157.875 8.12419C183.547 14.0609 206.593 28.182 223.539 48.3586C240.485 68.5353 250.412 93.6739 251.825 119.985"
                                        stroke="#F1641E"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                </g>
                                <path
                                    d="M14 91L87.6142 164.614"
                                    stroke="#F1641E"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M88 164.614L117.614 135"
                                    stroke="#F1641E"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M190 135L219.614 164.614"
                                    stroke="#F1641E"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                />
                                <path d="M220 165L220 135" stroke="#F1641E" strokeWidth="10" strokeLinecap="round" />
                                <path d="M190 232L190 135" stroke="#F1641E" strokeWidth="10" strokeLinecap="round" />
                                <path d="M156 244L156 135" stroke="#F1641E" strokeWidth="10" strokeLinecap="round" />
                                <path d="M252 193V135" stroke="#F1641E" strokeWidth="10" strokeLinecap="round" />
                                <path d="M118 247L118 135" stroke="#F1641E" strokeWidth="10" strokeLinecap="round" />
                            </svg>

                            <span className="text-[var(--primary)] text-[20px] font-bold uppercase">
                                Mini <br /> Libary
                            </span>
                        </Link>

                        <SearchBar />

                        <div className="flex items-center gap-[15px]">
                            {user.role === 'admin' && (
                                <button className="px-3 py-2 rounded-[15px] font-[500] hover:opacity-80 text-[16px] border-2 border-[var(--primary)] text-[var(--primary)] cursor-pointer">
                                    Quản lý sách
                                </button>
                            )}

                            {login ? (
                                <div className="relative" ref={dropdownRef}>
                                    <div
                                        className="px-3 py-3 rounded-full hover:bg-[var(--primary)]/30 cursor-pointer"
                                        onClick={toggleDropdown}
                                    >
                                        <FontAwesomeIcon icon={faUser} className="text-[20px]" />
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute -translate-x-1/2 left-[50%]  mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                                            <div
                                                className="px-4 py-2 text-gray-700 hover:bg-[var(--primary)]/30 cursor-pointer"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Thông tin tài khoản
                                            </div>
                                            <div
                                                className="px-4 py-2 text-gray-700 hover:bg-[var(--primary)]/30 cursor-pointer"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Lịch sử hoạt động
                                            </div>
                                            <div
                                                className="px-4 py-2 text-gray-700 hover:bg-[var(--primary)]/30 cursor-pointer"
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                Đăng xuất
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="px-4 py-4 hover:text-[var(--primary)] cursor-pointer"
                                    onClick={() => setIsAuthOpen(true)}
                                >
                                    <p className="text-[16px] font-semibold">Đăng nhập</p>
                                </div>
                            )}
                            <div className="px-3 py-2 rounded-full hover:bg-[var(--primary)]/30 text-[20px] cursor-pointer">
                                <FontAwesomeIcon icon={faHeart} />
                            </div>

                            <div className="px-3 py-2 rounded-full hover:bg-[var(--primary)]/30 text-[20px] cursor-pointer">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </div>

                            <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
