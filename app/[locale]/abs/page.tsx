import Container from "@/app/components/common/container";
import React from "react";
import { useTranslations } from "next-intl";

const Abs = () => {
   const t = useTranslations("VDMK-Page");

   return (
      <div className="w-full h-auto team flex pt-[70px] flex-col">
         <Container>
            <div className="inside-container w-full h-auto lg:py-12 py-8">
               <div className="what-is-abs w-full flex flex-col lg:mt-6 mt-1">
                  <div className="title-container">
                     <h5 className="lg:text-2xl text-2xl font-bold">
                        {t("whatIsAbsTitle")}
                     </h5>
                  </div>
                  <div className="text-container-inside mt-4">
                     <p className="text-[15px] font-medium">
                        {t("whatIsAbsText")}
                     </p>
                  </div>
               </div>
               <div className="how-abs-work w-full flex flex-col mt-12">
                  <div className="title-container">
                     <h5 className="lg:text-2xl text-2xl font-bold">
                        {t("howAbsWorksTitle")}
                     </h5>
                  </div>
                  <div className="text-container-inside mt-4">
                     <p className="text-[15px] font-medium">
                        {t("howAbsWorksText")}
                     </p>
                  </div>
                  <div className="list px-4 mt-8">
                     <ul className="list-disc *:mb-7 *:*:font-medium text-[15px]">
                        <li>
                           <p>
                              <span className="font-semibold">
                                {t("list.investorsTitle")}
                              </span>{" "}
                              {t("list.investors")}
                           </p>
                        </li>
                        <li>
                           <p>
                              <span className="font-semibold">
                                {t("list.fundTitle")}
                              </span>{" "}
                              {t("list.fund")}
                           </p>
                        </li>
                        <li>
                           <p>
                              <span className="font-semibold">
                                {t("list.originatorTitle")}
                              </span>{" "}
                              {t("list.originator")}
                           </p>
                        </li>
                        <li>
                           <p>
                              <span className="font-semibold">
                                {t("list.debtorTitle")}
                              </span>{" "}
                              {t("list.debtor")}
                           </p>
                        </li>
                        <li>
                           <p>
                              <span className="font-semibold">
                                {t("list.paymentTitle")}
                              </span>{" "}
                              {t("list.payment")}
                           </p>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default Abs;
