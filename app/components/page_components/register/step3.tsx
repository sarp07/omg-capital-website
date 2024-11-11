import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useUser } from "@/app/context/UserContext"; // UserContext'i import ettiğimizden emin olun

interface Step3Props {
  monthlyIncome: string;
  setMonthlyIncome: React.Dispatch<React.SetStateAction<string>>;
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string>>;
}

const Step3: React.FC<Step3Props> = ({
  monthlyIncome,
  setMonthlyIncome,
  profession,
  setProfession,
}) => {
  const t = useTranslations("Investment-Applications-Page");
  const { user } = useUser(); // UserContext'ten user bilgisini alıyoruz

  useEffect(() => {
    if (user) {
      // User bilgisi varsa monthlyIncome ve profession değerlerini otomatik olarak ayarla
      if (user.monthlyIncome) {
        setMonthlyIncome(user.monthlyIncome.toString());
      }
      if (user.profession) {
        setProfession(user.profession);
      }
    }
  }, [user, setMonthlyIncome, setProfession]);

  return (
    <>
      <div className="title-container w-full items-center mt-8">
        <h5 className="text-[17px] text-black">{t("fill-informations")}</h5>
      </div>
      <div className="input-container flex items-start gap-0 mt-8 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">
          {t("monthly-income")}
        </h5>
        <input
          type="number"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
        />
      </div>
      <div className="input-container flex items-start gap-0 mt-5 text-black flex-col">
        <h5 className="text-[13px] font-medium pl-[2px]">{t("profession")}</h5>
        <input
          type="text"
          className="w-[200px] h-[28px] rounded-sm outline-none border-2 border-[#cecece] text-black pl-[4px] text-[13px] font-medium"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
      </div>
    </>
  );
};

export default Step3;
