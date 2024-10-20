"use client";

import Container from "@/app/components/common/container";
import React, { useEffect, useState } from "react";
import Logo from "../../images/logo.png"; // Default logo
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";

// Define the VDMK type
interface VDMK {
  vdmkTitle: string;
  vdmkFaiz: string;
  vdmkVade: string;
  locale: string;
  status: "active" | "inactive";
  iconUrl: string;
  purchaseUrl: string;
}

const Profile = () => {
  const { user, activeSession, isLoading } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Abs-Page");
  const { locale } = useParams();
  const [vdmks, setVdmks] = useState<VDMK[]>([]);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    if (!isLoading && !activeSession) {
      router.push("/login");
    }
  }, [isLoading, activeSession, router]);

  useEffect(() => {
    const fetchVdmks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/issuances`,
          {
            params: { locale },
          }
        );

        const updatedVdmks = response.data.map((vdmk: any) => ({
          ...vdmk,
          status: vdmk.isActive ? "active" : "inactive",
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

  if (loading) {
    return (
      <div className="fixed inset-0 z-[600] flex flex-col justify-center items-center bg-white bg-opacity-98">
        <div className="relative duration-500 flex justify-center items-center">
          <div className="w-[200px] h-[200px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
          <div className="absolute">
            <Image src={Logo} alt="omg-logo" className="w-[150px] h-auto" />
          </div>
        </div>
        <div className="flex mt-6 text-logoGray">
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  const activeIssuances = vdmks.filter((vdmk) => vdmk.status === "active");
  const inactiveIssuances = vdmks.filter((vdmk) => vdmk.status === "inactive");

  const renderNoDataMessage = () => (
    <div className="text-center h-[500px] text-gray-500 mt-10">
      {activeTab === "active"
        ? t("not-found-issuance")
        : t("not-found-inactive")}
    </div>
  );

  return (
    <div className="w-full h-auto min-h-screen flex flex-col">
      <Container>
        <div className="w-full flex flex-col lg:pt-12 pt-6">
          <div className="title-container">
            <h5 className="text-xl font-semibold">
              {t("welcome")} {user?.username}
            </h5>
          </div>

          {/* Tablar */}
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

          {/* Verilerin Gösterimi */}
          <div className="vdmks-container w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-10 mt-6">
            {activeTab === "active" && activeIssuances.length > 0
              ? activeIssuances.map((vdmk, index) => (
                  <div
                    key={index}
                    className="vdmk-item w-full h-[220px] rounded shadow flex flex-col justify-between p-6 cursor-pointer"
                  >
                    <div className="logos w-full flex justify-between">
                      <Image
                        src={vdmk.iconUrl || Logo}
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
                      <h6 className="font-bold text-[18px]">
                        {vdmk.vdmkTitle}
                      </h6>
                      <p className="text-[16px] font-medium mt-3">
                        {vdmk.vdmkFaiz}
                      </p>
                      <p className="text-[16px] font-medium">{vdmk.vdmkVade}</p>
                    </div>
                    <div className="actions flex justify-between items-center mt-4">
                      <a
                        href="/termsheets/hepsiBurada_termsheet.pdf"
                        target="_blank"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {t("details")}
                      </a>
                      <a
                        href={
                          !user || !activeSession || vdmk.status === "inactive"
                            ? undefined
                            : "/investment-application"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          !user || !activeSession || vdmk.status === "inactive"
                            ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                            : "bg-logoRed text-white hover:bg-red-700"
                        } py-1 px-3 rounded transition`}
                        onClick={(e) =>
                          !user || !activeSession || vdmk.status === "inactive"
                            ? e.preventDefault()
                            : null
                        }
                      >
                        {t("purchase")}
                      </a>
                    </div>
                  </div>
                ))
              : activeTab === "inactive" && inactiveIssuances.length > 0
              ? inactiveIssuances.map((vdmk, index) => (
                  <div
                    key={index}
                    className="vdmk-item w-full h-[220px] rounded shadow flex flex-col justify-between p-6 cursor-pointer"
                  >
                    <div className="logos w-full flex justify-between">
                      <Image
                        src={vdmk.iconUrl || Logo}
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
                      <h6 className="font-bold text-[18px]">
                        {vdmk.vdmkTitle}
                      </h6>
                      <p className="text-[16px] font-medium mt-3">
                        {vdmk.vdmkFaiz}
                      </p>
                      <p className="text-[16px] font-medium">{vdmk.vdmkVade}</p>
                    </div>
                    <div className="actions flex justify-between items-center mt-4">
                      <a
                        href="/termsheets/hepsiBurada_termsheet.pdf"
                        target="_blank"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        {t("details")}
                      </a>
                      <a
                        href={
                          !user || !activeSession || vdmk.status === "inactive"
                            ? undefined
                            : vdmk.purchaseUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          !user || !activeSession || vdmk.status === "inactive"
                            ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                            : "bg-logoRed text-white hover:bg-red-700"
                        } py-1 px-3 rounded transition`}
                        onClick={(e) =>
                          !user || !activeSession || vdmk.status === "inactive"
                            ? e.preventDefault()
                            : null
                        }
                      >
                        {t("purchase")}
                      </a>
                    </div>
                  </div>
                ))
              : renderNoDataMessage()}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
