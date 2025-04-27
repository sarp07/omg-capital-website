import Container from "@/app/components/common/container";
import { useTranslations } from "next-intl";
import React from "react";

const ContactPage = () => {
  const t = useTranslations("Contact-Us-Page");

  return (
    <div className="w-full h-auto contact-page flex flex-col pt-[80px]">
      {/* Hero Section */}
      <div className="slider w-full flex max-h-[500px] h-full">
        <div className="firm-item w-screen max-h-[500px] lg:h-[500px] md:h-[250px] h-[200px] relative">
          <div className="absolute left-0 top-0 bg-[#0000007a] w-full h-full z-[20]"></div>
          <div className="hero-bigger-container h-full w-full">
            <Container>
              <div className="hero-container w-full flex relative z-[200] lg:h-[500px] md:h-[250px] h-[200px] text-white items-end justify-center">
                <h5 className="lg:text-6xl lg:font-extrabold font-bold lg:mb-12 text-2xl mb-4">
                  {t("contact-us")}
                </h5>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* Contact and Map Section */}
      <div className="contact-details-section w-full lg:mt-16 mt-8 lg:mb-16 mb-8 px-10">
        <div>
          <div className="details-container flex flex-col lg:flex-row gap-8 items-center">
            {/* Map Section */}
            <div className="map-container w-full lg:w-1/2 shadow-lg rounded-lg overflow-hidden flex justify-center">
              <iframe
                className="w-full h-[400px] lg:h-[450px] border-0 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.57896638568!2d28.979530219162265!3d41.01513713406521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac731cb46efc9%3A0x20172d7e4d6be019!2sOMG%20Capital%20Advisors!5e0!3m2!1str!2str!4v1696165041250!5m2!1str!2str"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            {/* Address Section */}
            <div className="address-container w-full lg:w-1/2 flex flex-col justify-center shadow-lg p-6 rounded-lg bg-white py-20">
              <h5 className="text-2xl lg:text-3xl font-bold mb-4 text-logoRed">
                {t("our-location")}
              </h5>
              <p className="text-logoGray text-lg leading-relaxed">
                {t("location-description-one")} <br />
                {t("location-description-two")} <br />
                {t("location-description-three")} <br />
                <strong>{t("phone")}:</strong> +90 (212) 705 89 80 <br />
                <strong>{t("email")}:</strong> info@omgcapital.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Contact Form */}
      <div className="contact-form-section w-full lg:mt-8 mt-4 lg:mb-24 mb-12 bg-gray-100 py-12">
        <div>
          <div className="form-container flex flex-col gap-4 max-w-3xl mx-auto shadow-lg bg-white p-8 rounded-lg">
            <h5 className="text-3xl font-bold text-center mb-6 text-logoRed">
              {t("get-in-touch")}
            </h5>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder={t("name")}
                  className="border border-logoGray rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-logoRed"
                  required
                />
                <input
                  type="email"
                  placeholder={t("email")}
                  className="border border-logoGray rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-logoRed"
                  required
                />
              </div>
              <input
                type="text"
                placeholder={t("subject")}
                className="border border-logoGray rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-logoRed"
                required
              />
              <textarea
                placeholder={t("message")}
                className="border border-logoGray rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-logoRed"
                required
              />
              <button
                type="submit"
                className="bg-logoRed text-white rounded-md p-3 hover:bg-[#8c262c] transition-colors"
              >
                {t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
