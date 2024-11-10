"use client";

import Container from "@/app/components/common/container";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Logo from "../../images/logo.png";
import pashaBankLogo from "../../images/logo-pashabank.png";
import { AiOutlineWarning } from "react-icons/ai";
import { useTranslations } from "next-intl";
import PdfModal from "../../components/page_components/modals/pdfModal";

interface VDMK {
  vdmkTitle: string;
  vdmkFaiz: string;
  vdmkVade: string;
  purchaseUrl: string;
  termsheet: string | null;
  iconUrl: string;
  isActive: string;
}

const Profile = () => {
  const { user, activeSession, isLoading } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Abs-Page");
  const { locale } = useParams();
  const [vdmks, setVdmks] = useState<VDMK[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openPdfModal = (pdf: string) => {
    const relativePath = pdf.split("/files/")[1];
    if (relativePath) {
      setPdfFile(
        `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/files/${relativePath}`
      );
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPdfFile(null);
  };

  useEffect(() => {
    const fetchVdmks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/issuances`,
          { params: { locale } }
        );

        const updatedVdmks = response.data.map((vdmk: any) => ({
          ...vdmk,
          isActive: vdmk.isActive === "true" ? "active" : "inactive",
        }));

        setVdmks(updatedVdmks);
      } catch (error) {
        console.error("Veriler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVdmks();
  }, [locale]);

  const activeIssuances = vdmks.filter((vdmk) => vdmk.isActive === "active");
  const inactiveIssuances = vdmks.filter(
    (vdmk) => vdmk.isActive === "inactive"
  );

  const sanitizeUrl = (url: string) => {
    return url?.replace(/^"+|"+$/g, "");
  };

  const handlePurchaseClick = (e: React.MouseEvent) => {
    if (!user || !activeSession) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="w-full h-auto min-h-screen flex flex-col py-10 gap-20">
      {!activeSession && (
        <div className="fixed w-full flex bg-yellow-100 mt-10 text-yellow-800 p-4 items-center justify-center gap-2 text-sm font-semibold">
          <AiOutlineWarning size={20} />
          <p>{t("guest-warning")} </p>
          <a href="/login" className="text-yellow-600 underline">
            {t("login-link-text")}
          </a>
        </div>
      )}

      <Container>
        <div className="w-full flex flex-col items-center lg:pt-12 pt-6 mt-[60px]">
          {/* Tab Menu */}
          <div className="tabs-container flex justify-center mt-6">
            <button
              className={`px-6 py-2 font-medium ${
                activeTab === "active" ? "border-b-2 border-logoRed" : ""
              }`}
              onClick={() => setActiveTab("active")}
            >
              {t("active-issuances")}
            </button>
            <button
              className={`px-6 py-2 font-medium ${
                activeTab === "inactive" ? "border-b-2 border-logoRed" : ""
              }`}
              onClick={() => setActiveTab("inactive")}
            >
              {t("inactive-issuances")}
            </button>
          </div>

          {/* Issuances List */}
          <div className="vdmks-container w-full flex flex-col items-center gap-6 lg:mt-10 mt-6">
            {(activeTab === "active" ? activeIssuances : inactiveIssuances).map(
              (vdmk, index) => (
                <div
                  key={index}
                  className="vdmk-item lg:w-[60%] w-[80%] lg:h-[150px] h-[185px] justify-center rounded py-4 px-6 shadow-lg flex flex-col items-center"
                >
                  <div className="logos w-full flex justify-between mb-3">
                    <Image
                      src={pashaBankLogo}
                      className="w-auto h-[24px]"
                      alt="company-logo"
                      width={24}
                      height={24}
                    />
                    <Image
                      src={Logo}
                      className="w-auto h-[24px]"
                      alt="omg-logo"
                    />
                  </div>
                  <div className="texts w-full justify-center items-center flex flex-col gap-1 mb-2 text-center">
                    <h6 className="font-semibold text-md">{vdmk.vdmkTitle}</h6>
                    <p className="text-sm font-medium text-gray-600">
                      {t("title", { rate: vdmk.vdmkFaiz, term: vdmk.vdmkVade })}
                    </p>
                  </div>

                  <div className="actions flex justify-between items-center w-full mt-3">
                    <button
                      onClick={() =>
                        vdmk.termsheet ? openPdfModal(vdmk.termsheet) : null
                      }
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {t("details")}
                    </button>
                    <a
                      href={
                        user && activeSession && vdmk.isActive === "active"
                          ? "/investment-application"
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        user && activeSession && vdmk.isActive === "active"
                          ? "bg-logoRed text-white hover:bg-red-700"
                          : "bg-gray-400 text-gray-300 cursor-not-allowed"
                      } py-1 px-3 rounded transition`}
                      onClick={handlePurchaseClick}
                    >
                      {t("purchase")}
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Container>

      {/* PDF Modal */}
      {showModal && pdfFile && (
        <PdfModal pdfFile={pdfFile} onClose={closeModal} />
      )}

      {showLoginModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[400px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4">
              <AiOutlineWarning size={24} className="text-yellow-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                {t("login-required-title")}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{t("login-required-message")}</p>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-logoRed text-white py-1 px-4 rounded"
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </button>
              <button
                className="bg-logoGray text-white py-1 px-4 rounded"
                onClick={() => router.push("/register")}
              >
                {t("register")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
