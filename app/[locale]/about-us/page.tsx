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
            
            {/* Products Section */}
            <div className="products-container mt-12">
              <h6 className="lg:text-2xl text-xl font-bold mb-4">
                {t("products-title")}
              </h6>
              <ul className="list-disc list-inside space-y-2 lg:text-base text-[14px] font-medium">
                {t.raw("products").map((product: string, index: number) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>

            {/* Approach Section */}
            <div className="approach-container mt-12">
              <h6 className="lg:text-2xl text-xl font-bold mb-4">
                {t("approach-title")}
              </h6>
              <p className="lg:text-base text-[14px] lg:font-semibold font-medium">
                {t("approach-description")}
              </p>
            </div>

            {/* Vision and Mission Section */}
            <div className="vision-mission-container mt-12 bg-gray-50 p-6 rounded-lg">
              <h6 className="lg:text-2xl text-xl font-bold mb-4">
                {t("vision-mission-title")}
              </h6>
              <p className="lg:text-base text-[14px] lg:font-semibold font-medium">
                {t("vision-mission-description")}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
