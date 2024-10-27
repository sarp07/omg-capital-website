import React from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface EnhancedModalProps {
  onClose: () => void;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  author?: string;
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
  onClose,
  title,
  description,
  date,
  image,
  link,
  author,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const t = useTranslations("News-Page");

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[500] flex items-center justify-center backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white mt-20 rounded-xl shadow-2xl w-[90%] lg:w-3/4 xl:w-2/3 max-h-[90vh] overflow-hidden relative">
        <button
          className="absolute top-5 right-5 text-red-500 hover:text-red-700 text-3xl focus:outline-none z-10"
          onClick={onClose}
        >
          <FaTimes color="red" size={24} />
        </button>

        {/* Resim Alanı */}
        <div className="relative overflow-hidden bg-gradient-to-t from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-3/4 py-6">
            <Image
              src={image}
              alt="news-modal-image"
              layout="responsive"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-xs font-medium py-1 px-3 rounded-full">
            {date}
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-8 lg:py-10 lg:px-12 flex flex-col space-y-4 overflow-y-auto max-h-[50vh]">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
              {title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            {author && (
              <div className="text-gray-500 text-sm font-semibold mt-2">
                <p>Yazar: {author}</p>
              </div>
            )}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block cursor-pointer mt-8 py-2 px-6 w-full md:w-1/2 mb-10 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-center"
          >
            {t("go-button")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;
