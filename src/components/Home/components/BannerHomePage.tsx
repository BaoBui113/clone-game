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
import { NavigationOptions } from 'swiper/types';

const BannerHomePage = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <>
            <div className='relative max-w-[704px] mx-auto'>
                <Swiper
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        if (swiper.params.navigation) {
                            const navigation = swiper.params.navigation as NavigationOptions;
                            navigation.prevEl = prevRef.current;
                            navigation.nextEl = nextRef.current;
                        }
                    }}

                    pagination={{ clickable: true }}
                    modules={[Navigation]}
                    slidesPerView={1}
                >
                    {
                        BANNER.map((banner, indx) => {
                            return (
                                <SwiperSlide key={indx}>
                                    <Link
                                        href={banner?.url || "/"}
                                        className="block "
                                    >
                                        <div className='relative w-full aspect-[1.76]'></div>
                                        <Image
                                            src={banner?.image || "/"}
                                            alt="banner"
                                            fill
                                            className="object-cover"
                                        />
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <button ref={prevRef} className="absolute flex items-center justify-center p-2 text-xl font-semibold text-black transform -translate-y-1/2 bg-white rounded-full -left-16 w-9 h-9 top-1/2">
                    {`<`}
                </button>
                <button ref={nextRef} className="absolute flex items-center justify-center p-2 text-xl font-semibold text-black transform -translate-y-1/2 bg-white rounded-full -right-16 w-9 h-9 top-1/2">
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
const BANNER: BannerHeaderType[] =
    [
        {
            image: "/images/banner/bnr.png",
            url: "#",
        },
        {
            image: "/images/banner/bnr-1.jpg",
            url: "#",
        },
        {
            image: "/images/banner/bnr-2.jpg",
            url: "#",
        },
        {
            image: "/images/banner/bnr-3.jpg",
            url: "#",
        },
        {
            image: "/images/banner/bnr-4.jpg",
            url: "#",
        },
    ]


