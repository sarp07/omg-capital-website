import React from "react";

import OnurAydogan from "../../images/team/onuraydogan.webp";
import UmutAydogan from "../../images/team/umutaydogan.webp";
import MuratGulkan from "../../images/team/muratgulkan.webp";
import NebilIlseven from "../../images/team/nebililseven.webp";
import BoraOruc from "../../images/team/boraoruc.webp";

import Image from "next/image";
import Container from "@/app/components/common/container";
import { useTranslations } from "next-intl";

const Team = () => {
  const t = useTranslations("Team-Page");
  return (
    <div className="w-full h-auto team flex flex-col">
      <div className="slider w-full flex max-h-[500px] pt-[80px] h-full">
        <div className="team-item w-screen max-h-[500px] lg:h-[500px] md:h-[250px] h-[160px] relative">
          <div className="absolute left-0 top-0 bg-[#0000007a] w-full h-full z-[20]"></div>
          <div className="hero-bigger-container h-full w-full">
            <Container>
              <div className="hero-container w-full flex relative z-[200] lg:h-[500px] md:h-[250px] h-[160px] text-white items-end justify-center">
                <h5 className="lg:text-6xl lg:font-extrabold font-bold lg:mb-12 text-2xl mb-4">
                  {t("banner-text")}
                </h5>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="team-inside w-full lg:mt-24 mt-12 lg:mb-24 mb-12">
        <Container>
          <div className="w-full flex flex-col">
            <div className="title-container w-full">
              <h5 className="lg:text-4xl text-2xl font-bold">{t("header")}</h5>
            </div>
            <div className="paragraph-container mt-8">
              <p className="lg:text-base text-[14px] lg:font-semibold font-medium">
                {t("base-description-one")}
                <br></br>
                <br></br>
                {t("base-description-two")}
              </p>
            </div>
            <div className="team-inside-container w-full flex flex-col gap-20 lg:mt-24 mt-12">
              <div className="team-item-part w-full flex justify-between lg:gap-12 gap-0 lg:flex-row flex-col">
                <div className="image-container lg:w-[380px] aspect-square w-full">
                  <Image
                    src={OnurAydogan}
                    alt="onur-aydogan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-container w-full flex-1 flex flex-col h-full lg:gap-6 gap-5 lg:pt-10 pt-6">
                  <h5 className="text-3xl font-bold">Onur AYDOĞAN</h5>
                  <h5 className="lg:text-base text-[15px] text-logoGray">
                    {t("person-description-one")}
                  </h5>
                </div>
              </div>
              <div className="team-item-part w-full flex justify-between lg:gap-12 gap-0 lg:flex-row flex-col">
                <div className="image-container lg:w-[380px] aspect-square w-full">
                  <Image
                    src={UmutAydogan}
                    alt="umut-aydogan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-container w-full flex-1 flex flex-col h-full lg:gap-6 gap-5 lg:pt-10 pt-6">
                  <h5 className="text-3xl font-bold">Umut AYDOĞAN</h5>
                  <h5 className="lg:text-base text-[15px] text-logoGray">
                    {t("person-description-two")}
                  </h5>
                </div>
              </div>
              <div className="team-item-part w-full flex justify-between lg:gap-12 gap-0 lg:flex-row flex-col">
                <div className="image-container lg:w-[380px] aspect-square w-full">
                  <Image
                    src={MuratGulkan}
                    alt="murat-gulkan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-container w-full flex-1 flex flex-col h-full lg:gap-6 gap-5 lg:pt-10 pt-6">
                  <h5 className="text-3xl font-bold">Murat GÜLKAN</h5>
                  <h5 className="lg:text-base text-[15px] text-logoGray">
                    {t("person-description-three")}
                  </h5>
                </div>
              </div>
              <div className="team-item-part w-full flex justify-between lg:gap-12 gap-0 lg:flex-row flex-col">
                <div className="image-container lg:w-[380px] aspect-square w-full">
                  <Image
                    src={NebilIlseven}
                    alt="nebil-ilseven"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-container w-full flex-1 flex flex-col h-full lg:gap-6 gap-5 lg:pt-10 pt-6">
                  <h5 className="text-3xl font-bold">Nebil İLSEVEN</h5>
                  <h5 className="lg:text-base text-[15px] text-logoGray">
                    {t("person-description-four")}
                  </h5>
                </div>
              </div>
              <div className="team-item-part w-full flex justify-between lg:gap-12 gap-0 lg:flex-row flex-col">
                <div className="image-container lg:w-[380px] aspect-square w-full">
                  <Image
                    src={BoraOruc}
                    alt="bora-oruc"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-container w-full flex-1 flex flex-col h-full lg:gap-6 gap-5 lg:pt-10 pt-6">
                  <h5 className="text-3xl font-bold">Bora ORUÇ</h5>
                  <h5 className="lg:text-base text-[15px] text-logoGray">
                    {t("person-description-five")}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Team;
