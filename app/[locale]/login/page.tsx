"use client";

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Logo from "../../images/logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Login = () => {
  const t = useTranslations("LoginPage");
  const { login, loginAsGuest } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false); // Checkbox için state
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Router'ı tanımladık

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Alanlar boşsa veya checkbox işaretlenmemişse uyarı ver
    if (!username || !password) {
      alert(t("error-message"));
      return;
    }

    setLoading(true);

    try {
      // login fonksiyonunu çağır ve sonucu kontrol et
      const result = await login(username, password);

      if (result.success) {
        // Login başarılıysa profile yönlendir
        router.push("/abs-page");
      } else {
        // Login başarısızsa hata mesajı göster
        alert(t("login-failed-message"));
      }
    } catch (error) {
      console.error("Login failed", error);
      alert(t("login-error")); // Hata durumu
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push("/abs-page");
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
      <div className="w-screen h-screen login-gradient overflow-x-hidden overflow-y-hidden text-white flex items-center overflow-hidden relative">
        <div className="absolute bg-[#00000055] z-[200] w-full h-full left-0 top-0"></div>
        <div className="w-full max-w-[1000px] h-[570px] bg-[#fffffff0] flex flex-col relative z-[200] lg:ml-40 rounded-2xl shadow">
          <div className="top w-full flex-1 h-full bg-[#ffffffc0] px-10 flex flex-col pt-8 rounded-t-2xl">
            <div className="image-container w-[150px]">
              <a href="/">
                <Image src={Logo} alt="omg-logo" className="w-[150px] h-auto" />
              </a>
            </div>
            <div className="title-container w-full items-center mt-8">
              <h5 className="text-[17px] text-black">{t("information")}</h5>
            </div>
            <div className="input-container flex items-start gap-0 mt-6 text-black flex-col">
              <h5 className="text-[13px] font-medium pl-[2px]">
                {t("username")}
              </h5>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
              />
            </div>
            <div className="input-container flex items-start gap-0 mt-3 text-black flex-col">
              <h5 className="text-[13px] font-medium pl-[2px]">
                {t("password")}
              </h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
              />
            </div>
            
            <div className="button-container py-5 gap-5 mt-5 flex">
              <button
                onClick={handleSubmit}
                className="px-6 py-[5px] rounded-lg bg-logoRed text-[13px] font-medium"
              >
                {t("login-button")}
              </button>
              <button
                onClick={handleGuestLogin}
                className="px-6 py-[5px] rounded-lg text-[13px] font-medium login-btn"
              >
                {t("continue-without-signup")}
              </button>
            </div>

            <div className="flex items-center gap-5 mt-4">
              <a
                href="/forgotusername"
                className="lg:text-[13px] text-[11px] text-black underline"
              >
                {t("forgot-username")}
              </a>
              <a
                href="/forgotpassword"
                className="lg:text-[13px] text-[11px] text-black underline"
              >
                {t("forgot-password")}
              </a>
            </div>
          </div>
          <div className="bottom flex lg:flex-row flex-col items-center justify-between w-full h-20 px-10 lg:py-0 py-[10px] text-black">
            <div className="left flex items-center text-[12px] font-medium">
              <h5>{t("marker")}</h5>
            </div>

            <div className="right flex gap-6">
              <a
                href="/"
                className="hover:bg-black hover:text-white transition-colors duration-300  px-4 py-[6px] bg-logoRed text-white rounded-lg text-[13px]"
              >
                {t("home")}
              </a>
              <a
                href="/register"
                className="hover:bg-black hover:text-white transition-colors duration-300  px-4 py-[6px] bg-logoRed text-white rounded-lg text-[13px]"
              >
                {t("register")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
