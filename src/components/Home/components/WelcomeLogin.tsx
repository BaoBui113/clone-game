import React from 'react';

const WelcomeLogin = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center gap-4 py-4 px-[10px] bg-white min-h-[392px]'>
            <h3 className='text-[#131313] text-center font-normal text-[60px] leading-[84px]'>
                The Return of the <br />
                SENDS CASINO
            </h3>
            <p className='text-[#4F4E4E] text-center font-normal text-2xl leading-8'>
                Wellcome to Sands Casino. <br />
                Enjoy the Best games at Sands Casino
            </p>
            <button className='rounded-lg bg-black border border-solid border-[#fff] w-fit px-9 py-2 hover:bg-blue-600 duration-300'>Login</button>
        </div>
    );
};

export default WelcomeLogin;