import React from 'react';
import SideBars from './SideBar';

import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex min-h-screen overflow-hidden'>
            <div className='w-1/4'>
                <SideBars />
            </div>
            <div className='w-3/4'>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
};

export default ContainerLayout;