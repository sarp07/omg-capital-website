"use client";

import Container from "@/app/components/common/container";
import React from "react";
import { useTranslations } from "next-intl";
import { FaUserCircle, FaArrowRight } from 'react-icons/fa';
import Image from "next/image";
import enDiagram from '../../images/abs/diagram-en.png';
import trDiagram from '../../images/abs/diagram-tr.png';
import { useParams } from "next/navigation";

const Abs = () => {
  const t = useTranslations("VDMK-Page");
  const { locale } = useParams(); // Locale bilgisini alıyoruz

  const steps = [
    { key: "sourceInstitution", number: 3, icon: <FaUserCircle /> },
    { key: "receivableTransferAmount", number: 4, icon: <FaArrowRight /> },
    { key: "transferToFund", number: 5, icon: <FaArrowRight /> },
    { key: "assetFund", number: 2, icon: <FaUserCircle /> },
    { key: "issueAmount", number: 1, icon: <FaArrowRight /> },
    { key: "principalPayment", number: 6, icon: <FaArrowRight /> },
    { key: "borrower", number: 7, icon: <FaUserCircle /> },
    { key: "originator", number: 8, icon: <FaUserCircle /> },
  ];

  // Diagram görselini locale'ye göre seç
  const selectedDiagram = locale === "tr" ? trDiagram : enDiagram;

  return (
    <div className="w-full h-auto flex flex-col pt-[90px] pb-[90px]">
      <Container>
        <div className="inside-container w-full h-auto lg:py-12 py-8">
          
          {/* Diagram Section */}
          <div className="diagram-container flex flex-col items-center mb-16 border border-gray-300 p-8 rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-12 relative">
              {/* Example Diagram Box with Arrows */}
              <div className="diagram-box flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h6 className="font-bold">{t("sourceInstitution")}</h6>
                <p className="text-sm">{t("sourceInstitutionText")}</p>
              </div>

              <svg className="w-8 h-8 text-orange-500">
                <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>

              <div className="diagram-box flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h6 className="font-bold">{t("assetFund")}</h6>
                <p className="text-sm">{t("assetFundText")}</p>
              </div>

              <svg className="w-8 h-8 text-orange-500">
                <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="2" />
              </svg>

              <div className="diagram-box flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h6 className="font-bold">{t("borrower")}</h6>
                <p className="text-sm">{t("borrowerText")}</p>
              </div>
            </div>

            {/* Diagram Steps */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                  <p className="text-sm font-medium">{t(step.key)}</p>
                  {step.icon && <div className="text-gray-600">{step.icon}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Section with IDs */}
          <div id="what-is-abs" className="what-is-abs w-full flex flex-col lg:mt-6 mt-12 border-b border-gray-300 pb-8">
            <h5 className="lg:text-2xl text-2xl font-bold">{t("whatIsAbsTitle")}</h5>
            <p className="text-[15px] font-medium mt-4">{t("whatIsAbsText")}</p>
          </div>

          <div id="how-abs-works" className="how-abs-works w-full flex flex-col mt-16 border-b border-gray-300 pb-8">
            <h5 className="lg:text-2xl text-2xl font-bold">{t("howAbsWorksTitle")}</h5>
            <p className="text-[15px] font-medium mt-4">{t("howAbsWorksText")}</p>
          </div>

          {/* Diagram Image based on locale */}
          <div className="how-abs-works w-full flex flex-col mt-16 border-b border-gray-300 pb-8">
            <Image src={selectedDiagram} alt="ABS Diagram" />
          </div>

          <div id="how-abs-buy" className="how-abs-works w-full flex flex-col mt-16 border-b border-gray-300 pb-8">
            <h5 className="lg:text-2xl text-2xl font-bold">{t("how-to-buy")}</h5>
            <p className="text-[15px] font-medium mt-4">{t("how-to-buy-text")}</p>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Abs;
