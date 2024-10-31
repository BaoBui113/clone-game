"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';


const BannerHomePage = () => {
    const swiperRef = useRef<any>(null);

    return (
        <>
            <div className='relative w-full xl:max-w-[704px] mx-auto'>
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper; // Lưu swiper vào ref
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation]}
                    slidesPerView={1}
                >
                    {BANNER.map((banner, indx) => (
                        <SwiperSlide key={indx}>
                            <Link href={banner?.url || "/"} className="block">
                                <div className='relative w-full aspect-[1.76]'></div>
                                <Image
                                    src={banner?.image || "/"}
                                    alt="banner"
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute z-30 flex items-center justify-center p-2 text-xl font-semibold text-white transform -translate-y-1/2 bg-black rounded-full xl:text-black xl:bg-white left-8 xl:-left-16 w-9 h-9 top-1/2"
                >
                    {`<`}
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute z-30 flex items-center justify-center p-2 text-xl font-semibold text-white transform -translate-y-1/2 bg-black rounded-full xl:text-black xl:bg-white right-8 xl:-right-16 w-9 h-9 top-1/2"
                >
                    {`>`}
                </button>
            </div>
        </>
    );
};

export default BannerHomePage;

type BannerHeaderType = {
    image: string;
    url?: string;
};

const BANNER: BannerHeaderType[] = [
    { image: "/images/banner/bnr.png", url: "#" },
    { image: "/images/banner/bnr-1.jpg", url: "#" },
    { image: "/images/banner/bnr-2.jpg", url: "#" },
    { image: "/images/banner/bnr-3.jpg", url: "#" },
    { image: "/images/banner/bnr-4.jpg", url: "#" },
];
