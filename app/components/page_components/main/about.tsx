import React from "react";
import Container from "../../common/container";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const About = () => {
   const t = useTranslations("About-Component")
   return (
      <div className="lg:mt-14 lg:mb-14 mt-12 mb-6 w-full h-auto">
         <Container>
            <div className="w-full flex flex-col">
               <div className="main-container w-full lg:gap-12 gap-2 flex lg:flex-row flex-col">
                  {/* u */}
                  <div className="text-container flex-1 flex flex-col py-6">
                     <div className="title-container">
                        <h5 className="text-[15px]  text-logoGray">
                           {t("home-about-header")}
                        </h5>
                     </div>
                     {/* <div className="title-container2 mt-5">
                        <h5 className="text-2xl font-bold">
                           Since the firm&apos;s founding in 1994, OMG Capital
                           Advisors has employed the same core investment
                           philosophy.
                        </h5>
                     </div> */}
                     <div className="text-container-inside mt-6">
                        <p className="text-[15px] font-medium">
                           {t("home-about-description")}
                        </p>
                     </div>
                     <div className="button-container mt-8">
                        <Link
                           href="/about-us"
                           className="px-8 py-[6px] bg-[#ffffff2e] border-2 border-black text-blackk rounded-md hover:bg-logoRed hover:border-logoRed hover:text-white transition-all duration-300 text-[15px]"
                        >
                           {t("read-more")}
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default About;
