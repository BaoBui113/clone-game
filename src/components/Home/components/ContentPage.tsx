"use client"
import { BannerHeader } from '@/components/Header/components/BannerHeader';
import React from 'react';
import BannerHomePage from './BannerHomePage';

const ContentPage = () => {
    return (
        <div className='bg-[#1B1B1B] w-full overflow-hidden p-[10px]'>
            <BannerHomePage />
        </div>
    );
};

export default ContentPage;