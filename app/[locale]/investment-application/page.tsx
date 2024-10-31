"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import Image from "next/image";
import Step1 from "../../components/page_components/investment-application/step1";
import Step2 from "../../components/page_components/investment-application/step2";
import Step3 from "../../components/page_components/investment-application/step3";
import Step4 from "../../components/page_components/investment-application/step4"; // Step4 for MKK and Account No
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";

const InvestmentApplicationPage = () => {
  const router = useRouter();
  const t = useTranslations("Investment-Applications-Page");
  const { user, isLoading, activeSession } = useUser(); // Get logged-in user info
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isLoading && !activeSession) {
      router.push("/login"); 
    }
  }, [isLoading, activeSession, router]);

  // Input values for each step
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idenfityNumber, setIdenfityNumber] = useState(""); // Identity Number
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [profession, setProfession] = useState("");
  const [mkkRegistrationNumber, setMkkRegistrationNumber] = useState(""); // MKK Registration Number
  const [accountNumber, setAccountNumber] = useState(""); // Account Number

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
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
      if (!mkkRegistrationNumber || !accountNumber) {
        alert(t("error-message"));
        return;
      }
      setLoading(true);

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/investors`, {
          name,
          surname,
          birthDate,
          idenfityNumber, // Include identity number in submission
          phoneNumber,
          email,
          city,
          province,
          monthlyIncome,
          profession,
          mkkRegistrationNumber, // Include MKK Registration number in submission
          accountNumber, // Include account number in submission
        });

        setTimeout(() => {
          router.push("https://tahvilbonovdmk.pashabank.com.tr/app");
        }, 5000);
      } catch (error) {
        console.error("Submission failed:", error);
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
            <p>{t("loading")}</p>
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
                idenfityNumber={idenfityNumber} // Added identity number
                setIdenfityNumber={setIdenfityNumber} // Function to update identity number
                isUserLoggedIn={!!user} // Pass a flag to disable fields if logged in
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
                isUserLoggedIn={!!user} // Pass a flag to disable fields if logged in
              />
            )}
            {step === 3 && (
              <Step3
                monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome}
                profession={profession}
                setProfession={setProfession}
              />
            )}
            {step === 4 && (
              <Step4
                mkkRegistrationNumber={mkkRegistrationNumber} // MKK Registration Number step
                setMkkRegistrationNumber={setMkkRegistrationNumber}
                accountNumber={accountNumber} // Account Number step
                setAccountNumber={setAccountNumber}
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
      </div>
    </>
  );
};

export default InvestmentApplicationPage;
