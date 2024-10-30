import Image from 'next/image';
import React from 'react';

const Header = () => {
    return (
        <div className='sticky top-0 left-0 right-0 z-30 flex justify-center w-full py-4 bg-[#1B1B1B]'>
            <div className='relative w-[290px] aspect-[6.304]'>
                <Image src={"/images/logo.png"} alt='logo' fill className='object-cover' />
            </div>
        </div>
    );
};

export default Header;