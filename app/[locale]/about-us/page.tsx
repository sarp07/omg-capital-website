import Container from "@/app/components/common/container";
import { useTranslations } from "next-intl";
import React from "react";

const AboutUs = () => {
  const t = useTranslations("About-Us-Page");
  return (
    <div className="w-full h-auto team flex flex-col pt-[80px]">
      <div className="slider w-full flex max-h-[500px] h-full">
        <div className="about-item w-screen max-h-[500px] lg:h-[500px] md:h-[250px] h-[200px] relative">
          <div className="absolute left-0 top-0 bg-[#0000007a] w-full h-full z-[20]"></div>
          <div className="hero-bigger-container h-full w-full">
            <Container>
              <div className="hero-container w-full flex relative z-[200] lg:h-[500px] md:h-[250px] h-[200px] text-white items-end justify-center">
                <h5 className="lg:text-6xl lg:font-extrabold font-bold lg:mb-12 text-2xl mb-4">
                  {t("about-us")}
                </h5>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="firm-inside w-full lg:mt-24 mt-12 lg:mb-24 mb-12">
        <Container>
          <div className="firm-inside-container">
            <div className="title-container w-full">
              <h5 className="lg:text-4xl text-2xl font-bold">
                {t("header")}
              </h5>
            </div>
            <div className="paragraph-container mt-8">
              <p className="lg:text-base text-[14px] lg:font-semibold font-medium">
                {t("base-description-one")}
                <br></br>
                <br></br>
                {t("base-description-two")}
                <br></br>
                <br></br>
                {t("base-description-three")}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
