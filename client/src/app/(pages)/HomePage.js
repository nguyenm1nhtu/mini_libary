'use client';

import React, { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
