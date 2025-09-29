'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import style from './Main.module.css';
import Category from './category/Category.jsx';

export default function Main() {
    const router = useRouter();

    return (
        <>
            <div className={style.container}>
                <div className={style.body}></div>
            </div>
        </>
    );
}
