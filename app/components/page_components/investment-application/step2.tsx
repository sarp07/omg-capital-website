import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

interface Step2Props {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  province: string;
  setProvince: React.Dispatch<React.SetStateAction<string>>;
  isUserLoggedIn: boolean; // Kullanıcı giriş yapmış mı?
}

const Step2: React.FC<Step2Props> = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  city,
  setCity,
  province,
  setProvince,
  isUserLoggedIn,
}) => {
  const t = useTranslations("Investment-Applications-Page");

  // Kullanıcı giriş yapmışsa email'i doldur
  useEffect(() => {
    if (isUserLoggedIn) {
      setEmail(email);
    }
  }, [isUserLoggedIn, email, setEmail]);

  return (
    <>
      <div className="title-container w-full items-center mt-8">
        <h5 className="text-[17px] text-black">{t("fill-informations")}</h5>
      </div>
      <div className="input-container flex items-start gap-0 mt-3 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("phone-number")}</h5>
        <input
          type="number"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      
      {/* Email Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("email")}</h5>
        <input
          type="email"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isUserLoggedIn} // Kullanıcı giriş yaptıysa alanı pasif yap
        />
      </div>
      
      {/* City Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("city")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Province Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("province")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
    </>
  );
};

export default Step2;
