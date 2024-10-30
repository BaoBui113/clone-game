import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const itemSlideBars = [
    {
        icon: '/images/icon/icon1.svg',
        title: '입금 신청',
        href: '/'
    },
    {
        icon: '/images/icon/icon2.svg',
        title: '출금 신청',
        href: '/'
    },

    {
        icon: '/images/icon/icon8.svg',
        title: '입/출금 내역',
        href: '/'
    },
    {
        icon: '/images/icon/icon3.svg',
        title: '쿠폰 내역',
        href: '/'
    },
    {
        icon: '/images/icon/icon4.svg',
        title: '추천 내역',
        href: '/'
    },
    {
        icon: '/images/icon/icon5.svg',
        title: '이벤트',
        href: '/'
    },
    {
        icon: '/images/icon/icon6.svg',
        title: '공지사항',
        href: '/'
    },
    {
        icon: '/images/icon/icon7.svg',
        title: '고객센터',
        href: '/'
    }
]


const ItemSideBars = ({ icon, title, href }: { icon: string; title: string, href: string }) => {
    return (
        <Link href={href} className='p-[10px] flex gap-4 items-center hover:bg-gray-700 transition-colors duration-300'>
            <div className='relative w-6 h-6'>
                <Image src={icon} alt='icon' fill />
            </div>
            <span className='font-semibold text-base leading-[22px] text-white'>{title}</span>
        </Link>
    )
};

const SideBars = () => {
    return (
        <div className='h-full bg-[#111316] px-[14px]'>
            <div className='relative w-full aspect-[3.1571] mb-5'>
                <Image src={"/images/logo.png"} alt='logo' fill />
            </div>
            <div className='py-5 flex flex-col gap-[10px]'>
                {itemSlideBars.map((item, indx) => {
                    return (
                        <ItemSideBars key={indx} icon={item.icon} title={item.title} href={item.href} />
                    )
                })}
            </div>
        </div>
    );
};

export default SideBars;