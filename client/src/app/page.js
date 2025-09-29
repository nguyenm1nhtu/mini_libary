'use client';

import { NextUIProvider } from '@nextui-org/react';
import HomePage from './(pages)/HomePage';

export default function Home() {
    return (
        <>
            <NextUIProvider>
                <HomePage />
            </NextUIProvider>
        </>
    );
}
