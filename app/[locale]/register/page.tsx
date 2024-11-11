"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Logo from "../../images/logo.png";
import Image from "next/image";
import Step1 from "../../components/page_components/register/step1";
import Step2 from "../../components/page_components/register/step2";
import Step3 from "../../components/page_components/register/step3"; // Step3'ü import ediyoruz
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const InvestmentApplicationPage = () => {
  const router = useRouter();
  const t = useTranslations("RegisterPage");
  const { register, isLoading, activeSession, guestActive } = useUser();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isLoading && activeSession && guestActive) {
      router.push("/login");
    }
  }, [isLoading, activeSession, router]);

  // Form verileri için state'ler
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [profession, setProfession] = useState("");

  const handleStep = async () => {
    if (step === 1 && (!email || !name || !surname)) {
      alert(t("error-message"));
      return;
    }
    
    if (step === 2) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      } else if (!username || !password) {
        alert(t("error-message"));
        return;
      }
    }

    if (step === 3) {
      try {
        setLoading(true);
        await register(name, surname, email, birthDate, username, password, monthlyIncome, profession);

        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setLoading(false);
      }
      return;
    }

    setStep(step + 1);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[600] flex flex-col justify-center items-center bg-white bg-opacity-80">
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
      <div className="w-screen h-screen login-gradient overflow-x-hidden overflow-y-hidden text-white flex items-center overflow-hidden relative">
        <div className="absolute bg-[#00000055] z-[200] w-full h-full left-0 top-0"></div>
        <div className="w-full max-w-[1000px] h-[500px] bg-[#fffffff0] flex flex-col relative z-[200] lg:ml-40 rounded-2xl shadow">
          <div className="top w-full flex-1 h-full bg-[#ffffffc0] px-10 flex flex-col pt-8 rounded-t-2xl">
            <div className="top-container flex w-full justify-between">
              <Image src={Logo} alt="omg-logo" className="w-[150px] h-auto" />
              <div className="steps">
                <h5 className="text-black">
                  {t("step")} {step}/3
                </h5>
              </div>
            </div>
            {step === 1 && (
              <Step1
                setName={setName}
                setSurname={setSurname}
                setEmail={setEmail}
                setBirthDate={setBirthDate}
              />
            )}
            {step === 2 && (
              <Step2
                setUsername={setUsername}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
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
          </div>
          <div className="bottom flex lg:flex-row flex-col items-center justify-between w-full h-20 px-10 lg:py-0 py-[10px] text-black">
            <div className="left flex items-center text-[12px] font-medium">
              <h5>{t("marker")}</h5>
            </div>

            <div className="right flex gap-6">
              <button
                className="hover:bg-black hover:text-white transition-colors duration-300 px-4 py-[6px] bg-logoRed text-white rounded-lg text-[13px]"
                onClick={handleStep}
              >
                {step < 3 ? t("next") : t("finish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentApplicationPage;
