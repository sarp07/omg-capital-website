import React from "react";
import Image from "next/image";

interface EnhancedModalProps {
  onClose: () => void;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
}

const EnhancedModal: React.FC<EnhancedModalProps> = ({
  onClose,
  title,
  description,
  date,
  image,
  link,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[500] flex items-center justify-center backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-[90%] lg:w-3/4 xl:w-2/3 max-h-[80vh] relative overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105">
        <button
          className="absolute top-3 right-5 text-red-600 hover:text-gray-800 text-3xl focus:outline-none"
          onClick={onClose}
        >
          &#10005; {/* X işareti */}
        </button>

        {/* İçerik Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Resim Alanı */}
          <div className="relative overflow-hidden rounded-l-lg">
            <Image
              src={image}
              alt="news-modal-image"
              layout="responsive"
              width={700}
              height={400}
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <p className="absolute bottom-4 left-4 text-sm text-gray-200 bg-black bg-opacity-50 px-2 py-1 rounded">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>

          {/* İçerik Alanı */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 tracking-wide leading-snug">
                {title}
              </h2>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              Haberin Kaynağına Git
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;
