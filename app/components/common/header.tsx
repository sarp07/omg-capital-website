"use client";

import React, { useEffect, useState, useContext } from "react";
import Logo from "../../images/logo.png";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { FaLinkedin } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { IoIosArrowDown } from "react-icons/io";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const Header = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const { user, activeSession, isLoading, logout } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [CommunityHover, setCommunityHover] = useState(false);
  const [ContactHover, setContactHover] = useState(false);
  const [MobileWhoWeAre, setMobileWhoWeAre] = useState(false);
  const [AbsHover, setAbsHover] = useState(false);

  const t = useTranslations("Navbar");

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCommunityHover(false);
    setContactHover(false);
  }, []);

  return (
    <div className="header-container fixed w-full shadow-md bg-[#F1F1F1] z-[1000]">
      <div
        className={`absolute mobile-menu w-full left-0 top-0 flex bg-[#F1F1F1] pt-24 z-[250] lg:hidden flex-col px-6 ${
          isOpen ? "active" : ""
        }`}
      >
        <div className="links w-full flex flex-col gap-2 *:text-black mt-5">
          <a href="/">{t("home")}</a>
          <div className="line w-full h-[1px] bg-[#0000000a] "></div>
          <div className="who-are-we">
            <div
              className="top w-full flex justify-between cursor-pointer"
              onClick={() => setMobileWhoWeAre(!MobileWhoWeAre)}
            >
              <h5>{t("about-us")}</h5>
              <IoIosArrowDown className="w-4 h-auto text-[#000000a1]" />
            </div>
            <div
              className={`bottom mt-2  flex-col gap-2  ${
                MobileWhoWeAre ? "flex" : "hidden"
              }`}
            >
              <a href="/team" className="font-medium pl-2 text-[14px]">
                {t("team")}
              </a>
              <a href="/about-us" className="font-medium pl-2 text-[14px]">
                {t("about-omg")}
              </a>
              <a href="/our-firm" className="font-medium pl-2 text-[14px]">
                {t("our-firm")}
              </a>
            </div>
          </div>
          {/* <div className="line w-full h-[1px] bg-[#0000000a]"></div>
          <a href="/our-firm">{t("our-firm")}</a> */}
          <div className="line w-full h-[1px] bg-[#0000000a]"></div>
          <a href="/news">{t("news")}</a>
          <div className="line w-full h-[1px] bg-[#0000000a] mb-1"></div>
          <a href="/abs">{t("whatis-vdmk-issuance")}</a>
          {/* {!activeSession && !isLoading ? (
            <>
              <div className="link mt-6">
                <a
                  href="/login"
                  className="w-full h-full px-6 py-2 bg-logoRed rounded-sm hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold"
                >
                  {t("investor-login")}
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="line w-full h-[1px] bg-[#0000000a] mb-1"></div>
              <a href="/profile">{t("vdmk-issuance")}</a>
              <div className="link mt-6 cursor-pointer" onClick={handleLogout}>
                <button className="w-full h-full px-6 py-2 bg-logoRed rounded-sm hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold">
                  {t("logout")}
                </button>
              </div>
            </>
          )} */}
          {!activeSession && !isLoading ? (
            <>
              <div className="link mt-6">
                <a
                  href="/login"
                  className="w-full h-full px-6 py-2 bg-logoRed rounded-sm hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold"
                >
                  {t("investor-login")}
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="line w-full h-[1px] bg-[#0000000a] mb-1"></div>
              <a href="/profile">{t("vdmk-issuance")}</a>
              <div className="link mt-6 cursor-pointer" onClick={handleLogout}>
                <button className="w-full h-full px-6 py-2 bg-logoRed rounded-sm hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="w-[20px] h-[20px] border-t-4 border-b-4 border-logoRed rounded-full animate-spin"></div>
                    </div>
                  ) : null}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="social-icons flex mt-8 gap-4">
          <div className="link h-10 flex items-center">
            <a
              href="https://www.linkedin.com/company/omg-capital-financial-advisory/"
              target="_blank"
              className=" text-black hover:text-logoRed w-full h-full flex items-center gap-4 rounded-tl-[6px] rounded-tr-[6px]"
            >
              <FaLinkedin className="w-auto h-7" />
            </a>
          </div>
          <div className="link h-10 flex items-center">
            <a href="/contact-us">{t("contact")}</a>
          </div>
          {/* <div className="link h-10 flex items-center">
                  <a
                     href="#"
                     className=" text-black hover:text-logoRed w-full h-full flex items-center gap-4 "
                  >
                     <FaInstagram className="w-auto h-7 " />
                  </a>
               </div>
               <div className="link h-10  flex items-center">
                  <a
                     href="#"
                     target="_blank"
                     className=" text-black hover:text-logoRed w-full h-full flex items-center gap-4 "
                  >
                     <FaMediumM className="w-auto h-7 " />
                  </a>
               </div> */}
        </div>
      </div>

      <div className="w-full max-w-[1350px] mx-auto h-auto flex xl:px-0 px-3">
        <div className="header-inner-container flex w-full lg:h-[80px] h-[78px]  justify-between items-center relative z-[400]">
          <div className="logo-container">
            <a href="/">
              <Image
                src={Logo}
                alt="omg-logo"
                className="lg:h-[48px] h-[48px] -mt-[3px] w-auto relatize z-[500]"
              />
            </a>
          </div>
          <div className="links gap-10 h-full items-center text-[14px] lg:flex hidden">
            <div className="link">
              <a
                href="/"
                className="w-full h-full hover:text-logoRed font-semibold"
              >
                {t("home")}
              </a>
            </div>
            <div
              className="community relative"
              onMouseEnter={() => setCommunityHover(true)}
              onMouseLeave={() => setCommunityHover(false)}
            >
              <a href="#">{t("who-we-are")}</a>
              {CommunityHover && (
                <div className="hoverable-community-menu absolute w-[110px] h-[165px] -left-1 pt-10 top-0 z-[1000] flex flex-col">
                  <div className="menu bg-white rounded-lg w-full h-full relative shadow pt-1">
                    <div className="triangle -top-3 left-4 absolute z-[200]"></div>

                    <div className="link h-10 w-full flex items-center">
                      <a
                        href="/about-us"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start rounded-[6px]  transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("about-omg")}</h5>
                      </a>
                    </div>
                    <div className="link h-10 w-full flex items-center">
                      <a
                        href="/our-firm"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start rounded-[6px]  transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("our-firm")}</h5>
                      </a>
                    </div>
                    <div className="link h-10 w-full flex items-center">
                      <a
                        href="/team"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start rounded-[6px] transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("team")}</h5>
                      </a>
                    </div>
                    {/* <div className="link h-10 w-full flex items-center">
                      <a
                        href="our-firm"
                        className="hover:bg-logoRed text-black rounded-bl-[6px] rounded-br-[6px] hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("our-firm")}</h5>
                      </a>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
            <div className="link">
              <a
                href="/news"
                className="w-full h-full hover:text-logoRed font-semibold"
              >
                {t("news")}
              </a>
            </div>

            <div
              className="community relative"
              onMouseEnter={() => setContactHover(true)}
              onMouseLeave={() => setContactHover(false)}
            >
              <a href="#">{t("contact")}</a>
              {ContactHover && (
                <div className="hoverable-community-menu absolute w-[120px] h-auto -left-1 pt-10 top-0 z-[1000] flex flex-col">
                  <div className="menu bg-white rounded-lg w-full h-full relative shadow">
                    <div className="triangle -top-3 left-4 absolute"></div>

                    <div className="link h-10 w-full flex items-center">
                      <a
                        href="https://www.linkedin.com/company/omg-capital-financial-advisory/"
                        target="_blank"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3  justify-start rounded-[6px] transition-colors duration-300"
                      >
                        <FaLinkedin className="text-[14px] mb-[1px]" />
                        <h5 className="text-[13px]">Linkedin</h5>
                      </a>
                    </div>
                    <div className="link h-10 w-full flex items-center">
                      <a
                        href="/contact-us"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3  justify-start rounded-[6px] transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("contact")}</h5>
                      </a>
                    </div>
                    {/* <div className="link h-10 w-full flex items-center">
                                 <a
                                    href="/team"
                                    className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3  justify-start transition-colors duration-300"
                                 >
                                    <FaInstagram className="text-[14px] mb-[1px]" />
                                    <h5 className="text-[13px]">Instagram</h5>
                                 </a>
                              </div>
                              <div className="link h-10 w-full flex items-center">
                                 <a
                                    href="/team"
                                    className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3  justify-start rounded-bl-[6px] rounded-br-[6px] transition-colors duration-300"
                                 >
                                    <FaMediumM className="text-[14px] mb-[1px]" />
                                    <h5 className="text-[13px]">Medium</h5>
                                 </a>
                              </div> */}
                  </div>
                </div>
              )}
            </div>
            <div
              className="community relative"
              onMouseEnter={() => setAbsHover(true)}
              onMouseLeave={() => setAbsHover(false)}
            >
              <a href="#">{t("whatis-vdmk-issuance")}</a>
              {AbsHover && (
                <div className="hoverable-community-menu absolute w-[150px] h-[280px] -left-1 pt-10 top-0 z-[1000] flex flex-col">
                  <div className="menu bg-white rounded-lg w-full h-full relative shadow">
                    <div className="triangle -top-3 left-4 absolute z-[200]"></div>

                    <div className="link h-20 w-full flex items-center">
                      <a
                        href="/abs#what-is-abs"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start rounded-[6px]  transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("what-is-an-abs")}</h5>
                      </a>
                    </div>
                    <div className="link h-20 w-full flex items-center">
                      <a
                        href="/abs#how-abs-works"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[10px] pl-3 justify-start rounded-[6px]  transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("how-does-work-abs")}</h5>
                      </a>
                    </div>
                    <div className="link h-20 w-full flex items-center">
                      <a
                        href="/abs#how-abs-buy"
                        className="hover:bg-logoRed text-black hover:text-white w-full h-full flex items-center gap-[5px] pl-3 justify-start rounded-[6px] transition-colors duration-300"
                      >
                        <h5 className="text-[13px]">{t("how-to-buy-abs")}</h5>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="link">
              <a
                href="/abs"
                className="w-full h-full hover:text-logoRed font-semibold"
              >
                {t("whatis-vdmk-issuance")}
              </a>
            </div> */}
            {/* <div className="link -mr-2">
                     <a
                        href="/investment-application"
                        className="w-full h-full px-6 py-2 bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[14px]"
                     >
                        {t("vdmk-issuance")}
                     </a>
                  </div> */}
            {/* {!activeSession && !isLoading ? (
              <>
                <div className="link">
                  <a
                    href="/login"
                    className="w-full h-full px-6 py-2 bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[14px]"
                  >
                    {t("investor-login")}
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="link">
                  <a
                    href="/profile"
                    className="w-full h-full hover:text-logoRed font-semibold"
                  >
                    {t("vdmk-issuance")}
                  </a>
                </div>
                <div className="link">
                  <button
                    onClick={handleLogout}
                    className="w-full h-full px-6 py-2 cursor-pointer bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[14px]"
                  >
                    {t("logout")}
                  </button>
                </div>
              </>
            )} */}
            {!activeSession && !isLoading ? (
              <>
                <div className="link">
                  <a
                    href="/login"
                    className="w-full h-full px-6 py-2 bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[14px]"
                  >
                    {t("investor-login")}
                  </a>
                </div>
              </>
            ) : isLoading ? (
              <div className="link">
                <div className="flex justify-center items-center w-full h-full">
                  <div className="w-[24px] h-[24px] border-t-4 border-b-4 border-logoRed rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="link">
                  <a
                    href="/profile"
                    className="w-full h-full hover:text-logoRed font-semibold"
                  >
                    {t("vdmk-issuance")}
                  </a>
                </div>
                <div className="link">
                  <button
                    onClick={handleLogout}
                    className="w-full h-full px-6 py-2 cursor-pointer bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[14px]"
                  >
                    {t("logout")}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="menu-icon lg:hidden flex  items-center gap-1">
            {/* <div className="link">
                     <a
                        href="/investment-application"
                        className="w-full h-full px-3 py-2 bg-logoRed rounded-md hover:bg-black duration-300 transition-colors text-white hover:text-white font-semibold text-[12px]"
                     >
                        {t("vdmk-issuance")}
                     </a>
                  </div> */}
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} rounded />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
