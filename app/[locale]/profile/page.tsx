"use client";

import Container from "@/app/components/common/container";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Logo from "../../images/logo.png";
import { AiOutlineWarning } from "react-icons/ai";
import { useTranslations } from "next-intl";
import PdfModal from "../../components/page_components/modals/pdfModal"; // Import PdfModal component

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
  const { user, activeSession, isLoading, guestActive } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Abs-Page");
  const { locale } = useParams();
  const [vdmks, setVdmks] = useState<VDMK[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null); // Modal PDF file path

  // Open PDF modal function
  const openPdfModal = (pdf: string) => {
    const relativePath = pdf.split("/files/")[1];
    if (relativePath) {
      setPdfFile(`http://localhost:5005/files/${relativePath}`);
      setShowModal(true);
    }
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    setPdfFile(null);
  };

  useEffect(() => {
    if (!isLoading && !activeSession && !guestActive) {
      router.push("/login");
    }
  }, [isLoading, activeSession, guestActive, router]);

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
          isActive: vdmk.isActive ? "active" : "inactive",
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
    return url?.replace(/^"+|"+$/g, ""); // Removes double quotes at start and end
  };

  if (loading) {
    return (
      <div className="bigger-container relative flex flex-col h-[500px] justify-center items-center aligns-center">
        <div className="relative duration-500 flex justify-center items-center">
          <div className="w-[100px] h-[100px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
          <div className="absolute">
            <Image src={Logo} alt="omg-logo" className="w-[70px] h-auto" />
          </div>
        </div>
        <div className="flex mt-6 text-logoGray">
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-screen flex flex-col">
      {guestActive && (
        <div className="flex bg-yellow-100 mt-[80px] text-yellow-800 p-4 flex items-center justify-center gap-2 text-sm font-semibold">
          <AiOutlineWarning size={20} />
          <p>{t("guest-warning")}</p>
        </div>
      )}

      <Container>
        <div className="w-full flex flex-col lg:pt-12 pt-6">
          <div className="title-container">
            <h5 className="text-xl font-semibold">
              {guestActive
                ? t("welcome-guest")
                : `${t("welcome")} ${user?.username}`}
            </h5>
          </div>

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

          {/* Display Data */}
          <div className="vdmks-container w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-10 mt-6">
            {(activeTab === "active" ? activeIssuances : inactiveIssuances).map(
              (vdmk, index) => (
                <div
                  key={index}
                  className="vdmk-item w-full h-[220px] rounded shadow flex flex-col justify-between p-6 cursor-pointer"
                >
                  <div className="logos w-full flex justify-between">
                    <Image
                      src={sanitizeUrl(vdmk.iconUrl) || Logo}
                      className="w-auto h-[32px]"
                      alt="company-logo"
                      width={32}
                      height={32}
                    />
                    <Image
                      src={Logo}
                      className="w-auto h-[32px]"
                      alt="omg-logo"
                    />
                  </div>
                  <div className="texts w-full flex flex-col gap-1 flex-1 justify-center">
                    <h6 className="font-bold text-[18px]">{vdmk.vdmkTitle}</h6>
                    <p className="text-[16px] font-medium mt-3">
                      {vdmk.vdmkFaiz}
                    </p>
                    <p className="text-[16px] font-medium">{vdmk.vdmkVade}</p>
                  </div>
                  <div className="actions flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        vdmk.termsheet ? openPdfModal(vdmk.termsheet) : null
                      }
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {t("details")}
                    </button>
                    <a
                      href={
                        !user || !activeSession || vdmk.isActive === "inactive"
                          ? undefined
                          : "/investment-application"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        !user || !activeSession || vdmk.isActive === "inactive"
                          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                          : "bg-logoRed text-white hover:bg-red-700"
                      } py-1 px-3 rounded transition`}
                      onClick={(e) =>
                        !user || !activeSession || vdmk.isActive === "inactive"
                          ? e.preventDefault()
                          : null
                      }
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
    </div>
  );
};

export default Profile;
