import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Step1Props {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Step1: React.FC<Step1Props> = ({ setName, setSurname, setEmail }) => {
  const t = useTranslations("RegisterPage");


  return (
    <>
      <div className="title-container w-full items-center mt-8">
        <h5 className="text-[17px] text-black">{t("title")}</h5>
      </div>
      <div className="input-container flex items-start gap-0 mt-2 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("name")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("surname")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("email")}</h5>
        <input
          type="email"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("gender")}</h5>
        <select
          name="gender"
          id="gender"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled selected>
            {t("select-gender")}
          </option>
          <option value="male">{t("male")}</option>
          <option value="female">{t("female")}</option>
        </select>
      </div> */}
    </>
  );
};

export default Step1;