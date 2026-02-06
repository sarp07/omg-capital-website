import React from "react";
import Container from "../../common/container";
import TeamSquare from "../../../images/team/teamsquare.webp";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const Team = () => {
   const t = useTranslations("Team-Component");

   return (
      <div className="w-full flex h-auto bg-[#f3f2f2] lg:pt-4 pt-4 lg:pb-4 pb-12">
         <Container>
            <div className="w-full flex lg:gap-12 gap-0 lg:flex-row flex-col">
               <div className="image-container md:w-[400px] aspect-square flex items-center">
                  <Image
                     src={TeamSquare}
                     alt="team"
                     className="w-full object-cover aspect-[8/6]"
                  />
               </div>
               <div className="text-container flex-1 flex flex-col justify-center">
                  <div className="title-container">
                     <h5 className="text-[15px]  text-logoGray">
                        {t("home-team-header")}
                     </h5>
                  </div>
                  {/* <div className="title-container2 mt-5">
                     <h5 className="text-2xl font-bold">
                        Our team provides the best investment advising.
                     </h5>
                  </div> */}
                  <div className="text-container-inside mt-6">
                     <p className="text-[15px] font-medium">
                        {t("home-team-description")}
                        <br></br>
                        <br></br>
                     </p>
                  </div>
                  <div className="button-container mt-3">
                     <Link
                        href="/team"
                        className="px-8 py-[6px] bg-[#ffffff2e] border-2 border-black text-blackk rounded-md hover:bg-logoRed hover:border-logoRed hover:text-white transition-all duration-300 text-[15px]"
                     >
                        {t("read-more")}
                     </Link>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default Team;
