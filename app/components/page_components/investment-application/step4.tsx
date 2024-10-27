import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Step4Props {
  mkkRegistrationNumber: string;
  setMkkRegistrationNumber: React.Dispatch<React.SetStateAction<string>>;
  accountNumber: string;
  setAccountNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Step4: React.FC<Step4Props> = ({
  mkkRegistrationNumber,
  setMkkRegistrationNumber,
  accountNumber,
  setAccountNumber,
}) => {
  const t = useTranslations("Investment-Applications-Page");

  // Radio button state
  const [dontKnowDetails, setDontKnowDetails] = useState(false);

  // Radio button toggle
  const handleRadioToggle = () => {
    setDontKnowDetails(!dontKnowDetails);

    if (!dontKnowDetails) {
      setMkkRegistrationNumber("unknown");
      setAccountNumber("unknown");
    } else {
      setMkkRegistrationNumber("");
      setAccountNumber("");
    }
  };

  return (
    <>
      <div className="title-container w-full items-center mt-8">
        <h5 className="text-[17px] text-black">{t("mkk-explanation-title")}</h5>
      </div>

      <div className="description-container mt-4 text-black text-[13px]">
        <p>
          {t("mkk-explanation")}{" "}
          <a
            href="https://eyatirimci.mkk.com.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-logoRed underline"
          >
            {t("click-here")}
          </a>{" "}
          {t("for-more-info")}
        </p>
      </div>

      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">
          {t("mkk-registration-number")}
        </h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={mkkRegistrationNumber}
          onChange={(e) => setMkkRegistrationNumber(e.target.value)}
          disabled={dontKnowDetails} // Disabled if the user doesn't know
        />
      </div>

      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">
          {t("account-number")}
        </h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={dontKnowDetails} // Disabled if the user doesn't know
        />
      </div>

      <div className="radio-container mt-5 text-black">
        <label className="text-[13px] font-medium pl-[2px] flex items-center">
          <input
            type="radio"
            className="mr-2"
            checked={dontKnowDetails}
            onChange={handleRadioToggle}
          />
          {t("dont-know-mkk-account")}
        </label>
      </div>
    </>
  );
};

export default Step4;
