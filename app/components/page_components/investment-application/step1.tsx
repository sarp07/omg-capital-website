import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

interface Step1Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  birthDate: string;
  setBirthDate: React.Dispatch<React.SetStateAction<string>>;
  idenfityNumber: string; // Kimlik numarası
  setIdenfityNumber: React.Dispatch<React.SetStateAction<string>>;
  isUserLoggedIn: boolean; // Kullanıcı giriş yapmış mı?
}

const Step1: React.FC<Step1Props> = ({
  name,
  setName,
  surname,
  setSurname,
  birthDate,
  setBirthDate,
  idenfityNumber,
  setIdenfityNumber,
  isUserLoggedIn,
}) => {
  const t = useTranslations("Investment-Applications-Page");

  useEffect(() => {
    if (isUserLoggedIn) {
      // Kullanıcı giriş yaptıysa, bu alanları pasif yap.
      const storedBirthDate = birthDate && new Date(birthDate).toISOString().split("T")[0];

      setName(name);
      setSurname(surname);
      setBirthDate(storedBirthDate || "");
    }
  }, [isUserLoggedIn, setName, setSurname, setBirthDate, name, surname, birthDate]);

  return (
    <>
      <div className="title-container w-full items-center mt-8">
        <h5 className="text-[17px] text-black">{t("fill-informations")}</h5>
      </div>

      {/* Name Field */}
      <div className="input-container flex items-start gap-0 mt-2 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("name")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isUserLoggedIn} // Kullanıcı giriş yaptıysa alanı pasif yap
        />
      </div>

      {/* Surname Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("surname")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          disabled={isUserLoggedIn} // Kullanıcı giriş yaptıysa alanı pasif yap
        />
      </div>

      {/* Birth Date Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("birth-date")}</h5>
        <input
          type="date"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          disabled={isUserLoggedIn}
        />
      </div>

      {/* Identity Number (Kimlik No) Field */}
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("identity-number")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={idenfityNumber}
          onChange={(e) => setIdenfityNumber(e.target.value)}
        />
      </div>
    </>
  );
};

export default Step1;
