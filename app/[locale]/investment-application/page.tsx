"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import Image from "next/image";
import Step1 from "../../components/page_components/investment-application/step1";
import Step2 from "../../components/page_components/investment-application/step2";
import Step3 from "../../components/page_components/investment-application/step3";
import Step4 from "../../components/page_components/investment-application/step4"; 
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";

const InvestmentApplicationPage = () => {
  const router = useRouter();
  const t = useTranslations("Investment-Applications-Page");
  const { user, isLoading, activeSession } = useUser(); 
  const [loading, setLoading] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isLoading && !activeSession) {
      router.push("/login");
    }
  }, [isLoading, activeSession, router]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idenfityNumber, setIdenfityNumber] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [profession, setProfession] = useState("");
  const [mkkRegistrationNumber, setMkkRegistrationNumber] = useState(""); 
  const [accountNumber, setAccountNumber] = useState(""); 
  const [organizationName, setOrganizationName] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setBirthDate(user.birthDate);
      setEmail(user.email);
    }
  }, [user]);

  const handleStep = async () => {
    if (step === 1) {
      if (!name || !surname || !birthDate || !idenfityNumber) {
        alert(t("error-message"));
        return;
      }
    }

    if (step === 2) {
      if (!phoneNumber || !email || !city || !province) {
        alert(t("error-message"));
        return;
      }
    }

    if (step === 3) {
      if (!monthlyIncome || !profession) {
        alert(t("error-message"));
        return;
      }
    }

    if (step === 4) {
      if (!mkkRegistrationNumber || !accountNumber || !organizationName) {
        alert(t("error-message"));
        return;
      }
      setLoading(true);

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/investors`,
          {
            name,
            surname,
            birthDate: new Date(birthDate),
            idenfityNumber, 
            phoneNumber,
            email,
            city,
            province,
            monthlyIncome: Number(monthlyIncome),
            profession,
            mkkRegistrationNumber, 
            accountNumber,
            organizationName: organizationName || "unkown",
          }
        );

        setTimeout(() => {
          router.push("https://tahvilbonovdmk.pashabank.com.tr/app");
        }, 5000);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.status || "";

          if (error.response?.status === 205) {
            setShowDuplicateModal(true);
          } else {
            console.error(
              "Axios ile ilgili başka bir hata oluştu:",
              errorMessage
            );
            console.error(error);
          }
        } else if (error instanceof Error) {
          console.error("Diğer hata oluştu:", error.message);
        }
        setLoading(false);
      }

      return;
    }

    setStep(step + 1);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[600] flex flex-col justify-center items-center bg-white bg-opacity-98">
          <div className="relative duration-500 flex justify-center items-center">
            <div className="w-[200px] h-[200px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
            <div className="absolute">
              <Image src={Logo} alt="omg-logo" className="w-[150px] h-auto" />
            </div>
          </div>
          <div className="flex mt-6 text-logoGray">
            <p>{t("redirect")}</p>
          </div>
        </div>
      )}

      <div
        className={`w-screen h-screen login-gradient overflow-x-hidden overflow-y-hidden text-white flex items-center overflow-hidden relative ${
          loading ? "blur-sm" : ""
        }`}
      >
        <div className="absolute bg-[#00000055] z-[200] w-full h-full left-0 top-0"></div>
        <div className="w-full max-w-[1000px] h-[500px] bg-[#fffffff0]  flex flex-col relative z-[200] lg:ml-40 rounded-2xl shadow">
          <div className="top w-full flex-1 h-full bg-[#ffffffc0] px-10 flex flex-col pt-8 rounded-t-2xl">
            <div className="top-container flex w-full justify-between">
              <Image src={Logo} alt="omg-logo" className="w-[150px] h-auto" />
              <div className="steps">
                <h5 className="text-black">
                  {t("step")} {step}/4
                </h5>
              </div>
            </div>

            {step === 1 && (
              <Step1
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                idenfityNumber={idenfityNumber} 
                setIdenfityNumber={setIdenfityNumber} 
                isUserLoggedIn={!!user} 
              />
            )}
            {step === 2 && (
              <Step2
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email={email}
                setEmail={setEmail}
                city={city}
                setCity={setCity}
                province={province}
                setProvince={setProvince}
                isUserLoggedIn={!!user} 
              />
            )}
            {step === 3 && (
              <Step3
                monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome}
                profession={profession}
                setProfession={setProfession}
                isUserLoggedIn={!!user}
              />
            )}
            {step === 4 && (
              <Step4
                mkkRegistrationNumber={mkkRegistrationNumber} 
                setMkkRegistrationNumber={setMkkRegistrationNumber}
                accountNumber={accountNumber} 
                setAccountNumber={setAccountNumber}
                organizationName={organizationName}
                setOrganizationName={setOrganizationName}
              />
            )}
          </div>
          <div className="bottom flex lg:flex-row flex-col items-center justify-between w-full h-20 px-10 lg:py-0 py-[10px] text-black">
            <div className="left flex items-center text-[12px] font-medium">
              <h5>© 2011 - 2024 OMG CAPITAL ADVISORS GROUP</h5>
            </div>

            <div className="right flex gap-6">
              <button
                className="hover:bg-black hover:text-white transition-colors duration-300 px-4 py-[6px] bg-logoRed text-white rounded-lg text-[13px]"
                onClick={handleStep}
              >
                {step === 1 && `${t("next-button")}`}
                {step === 2 && `${t("next-button")}`}
                {step === 3 && `${t("next-button")}`}
                {step === 4 && `${t("submit-button")}`}
              </button>
            </div>
          </div>
        </div>
        {showDuplicateModal && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
            onClick={() => setShowDuplicateModal(false)}
          >
            <div
              className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[400px] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Zaten Kayıtlısınız!
              </h2>
              <p className="text-gray-600 mb-6">
                Bu e-posta adresi ile zaten bir başvuru yapılmış. İhraçlara
                bakmaya devam edebilir veya Pasha Bank sayfasına
                yönlendirilebilirsiniz.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-logoRed text-white py-1 px-4 rounded"
                  onClick={() => setShowDuplicateModal(false)}
                >
                  İhraçlara Bakmaya Devam Et
                </button>
                <button
                  className="bg-logoGray text-white py-1 px-4 rounded"
                  onClick={() =>
                    (window.location.href =
                      "https://tahvilbonovdmk.pashabank.com.tr")
                  }
                >
                  Pasha Bank'a Git
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvestmentApplicationPage;
