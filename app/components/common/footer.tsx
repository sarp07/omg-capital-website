"use client";

import React from "react";
import Container from "./container";
import Logo from "../../images/logo.png";
import En from "../../images/langs/eng.png";
import Tr from "../../images/langs/tr.png";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("Footer");

  const router = useRouter();

  const changeLanguage = (newLocale: string) => {
    router.replace("/", { locale: newLocale });
  };

  return (
    <div className="w-full flex lg:h-[300px] h-auto bg-[#f0f0f0]">
      <Container>
        <div className="w-full justify-between lg:pt-8 pt-16 h-full flex flex-col lg:gap-0 gap-12 xl:px-4 px-0">
          <div className="top h-full flex-1 w-full">
            <div className="w-full flex justify-between h-full lg:flex-row flex-col lg:gap-0 gap-12">
              <div className="left flex-1 w-full flex flex-col lg:items-start items-center">
                <div className="logo-container h-full flex items-center -mt-3">
                  <div className="logo">
                    <Link href="/" className="w-auto">
                      <Image
                        src={Logo}
                        alt="omg-logo"
                        className="lg:h-[100px] w-auto h-[60px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="middle flex-1 justify-center items-center text-center h-full flex flex-col gap-3">
                <div className="h-full flex flex-col justify-center gap-3 mt-1">
                  <div className="title-container">
                    <h5 className="font-bold text-[18px]">{t("navigation")}</h5>
                  </div>
                  <div className="links w-full flex flex-col text-center   gap-[6px]">
                    <Link
                      href="/about-us"
                      className="text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      {t("about-us")}
                    </Link>
                    <Link
                      href="/team"
                      className="text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      {t("team")}
                    </Link>
                    <Link
                      href="/our-firm"
                      className="text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      {t("our-firm")}
                    </Link>
                    <Link
                      href="/news"
                      className="text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      {t("news")}
                    </Link>
                    <Link
                      href="/contact-us"
                      className="text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      {t("contact")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="right flex-1 w-full flex flex-col lg:items-end items-center -mt-0 h-full justify-center">
                <div className="socials h-full flex flex-col justify-center gap-5 lg:items-end items-center">
                  <h5 className="text-[16px] font-extrabold">
                    {t("social-media")}
                  </h5>
                  <div className="social-links flex flex-col gap-[10px] text-end">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/omg-capital-financial-advisory/"
                      className="flex items-center lg:justify-end justify-center lg:flex-row flex-row-reverse gap-2 text-[15px] hover:text-logoRed transition-colors duration-300"
                    >
                      Linkedin <FaLinkedin className="text-[18px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dİl Seçimi Alanı */}
          <div className="bottom w-full flex justify-between items-center flex-wrap h-auto pb-3">
            <h5 className="text-[13px] text-[#6e6d6daa] font-semibold">
              {t("marker")}
            </h5>
            <div className="flex gap-4 items-center">
              <a
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 rounded cursor-pointer ${
                  locale === "en" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                <Image src={En} width={30} height={30} alt="English flag" />
              </a>
              <a
                onClick={() => changeLanguage("tr")}
                className={`px-3 py-1 rounded cursor-pointer ${
                  locale === "tr" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                <Image src={Tr} width={30} height={30} alt="Turkish flag" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
