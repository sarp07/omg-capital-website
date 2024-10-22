// src/components/common/hero.tsx
"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Hero = () => {
  const t = useTranslations("Hero-Component");

  return (
    <div className="slider w-full flex max-h-[650px] h-full">
      <div className="slider-item w-screen max-h-[650px] pt-[80px] h-full relative">
        <div className="absolute left-0 top-0 bg-[#000000be] w-full h-full z-[20] "></div>

        <div className="hero-bigger-container h-full w-full">
          <div className="hero-container w-full flex relative z-[200] lg:h-[650px] md:h-[450px] h-[280px] text-white items-center">
            <div className="left flex flex-col w-full items-center">
              <div className="title-container lg:full w-3/4 lg:mt-0 mt-5 items-center text-center">
                <h5 className="lg:text-5xl text-xl font-bold">
                  {t("home-header")}
                </h5>
              </div>
              <div className="line w-[200px] h-[2px] bg-white lg:mt-10 mt-4 lg:mb-8 mb-2"></div>
              <div className="title-container lg:full w-11/12 lg:mt-0 mt-5 items-center text-center">
                <h5 className="lg:text-lg text-base">
                {t("home-sub-header")}
                </h5>
              </div>
              <div className="button-container lg:mt-16 mt-8">
                <a
                  href="/team"
                  className="lg:px-10 lg:py-[10px] px-6 py-[6px] lg:text-lg text-[15px] bg-logoRed rounded-lg text-white border-2 border-logoRed hover:border-white hover:bg-white hover:text-black hover:bg-transparent transition-colors duration-300"
                >
                  {t("home-button-name")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
