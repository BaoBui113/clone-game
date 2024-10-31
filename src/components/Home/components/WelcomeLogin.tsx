"use client";
import { useDisclosure } from '@nextui-org/react';
import React from 'react';
import ModalCommon from './CommonModal';

import FormLogin from './FormLogin';

const WelcomeLogin = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center gap-4 py-4 md:px-[10px] px-5 bg-white md:py-11'>
                <h3 className='text-[#131313] text-center font-normal text-[34px] md:text-[60px] md:leading-[84px] leading-[47px]'>
                    The Return of the <br />
                    SENDS CASINO
                </h3>
                <p className='text-[#222] md:text-[#4F4E4E] text-sm font-medium leading-5 text-center md:font-normal md:text-2xl md:leading-8'>
                    Wellcome to Sands Casino. <br />
                    Enjoy the Best games at Sands Casino
                </p>
                <button onClick={onOpen} className='rounded-lg bg-black border border-solid border-[#fff] w-fit px-9 py-2 hover:bg-blue-600 duration-300 text-white'>Login</button>
            </div>
            <ModalCommon isOpen={isOpen} onOpenChange={onOpenChange}>
                <FormLogin onClose={onClose} />
            </ModalCommon>
        </>
    );
};

export default WelcomeLogin;