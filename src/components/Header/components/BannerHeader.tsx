"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useScreen } from "@/libs/hooks/useScreen";
import { useHomeContext } from "@/components/Home/provider/home-provider";
import { BannerItemSkeleton } from "./BannerItemSkeleton";

type Props = {};
export function BannerHeader({}: Props) {
  const [bannerSlide, setBannerSlide] = useState<any[]>(BANNER);
  const isMd = useScreen("md");
  const [typeScreen, setTypeScreen] = useState("desktop");
  const { isLoadSkeleton } = useHomeContext();

  useEffect(() => {
    setTypeScreen(!isMd ? "mobile" : "desktop");
  }, [isMd]);
  
  return (
    <>
      <Swiper
        className="h-full text-white"
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
      >
        {!!bannerSlide?.length &&
          bannerSlide
            ?.find((item: any) => item.type === typeScreen)
            ?.imgs?.map(
              (banner: { image: string; url: string }, index: number) => (
                <div key={index}>
                  {isLoadSkeleton ? (
                    <SwiperSlide key={index}>
                      <BannerItemSkeleton />
                    </SwiperSlide>
                  ) : (
                    <SwiperSlide key={index}>
                      <Link
                        href={banner?.url || "/"}
                        className="block "
                      >
                        <Image
                          src={banner?.image || "/"}
                          alt="banner"
                          width={"0"}
                          height={"0"}
                          sizes="100vw"
                          className="object-cover w-full h-auto"
                          loading={"lazy"}
                        />
                      </Link>
                    </SwiperSlide>
                  )}
                </div>
              )
            )}
      </Swiper>
    </>
  );
}

type BannerHeaderType = {
  type: string;
  imgs: {
    image: string;
    url?: string;
  }[];
};

const BANNER: BannerHeaderType[] = [
  {
    type: "desktop",
    imgs: [
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
    ],
  },
  {
    type: "mobile",
    imgs: [
      {
        image: "/images/banner/bnr-mb-1.jpg",
        url: "#",
      },
      {
        image: "/images/banner/bnr-mb-2.jpg",
        url: "#",
      },
      {
        image: "/images/banner/bnr-mb-3.jpg",
        url: "#",
      },
      {
        image: "/images/banner/bnr-mb-4.jpg",
        url: "#",
      },
    ],
  },
];
