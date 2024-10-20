"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/app/components/common/container";
import Image from "next/image";
import { useParams } from "next/navigation";
import EnhancedModal from "../../components/common/enhancedModal"; // Modal bileşeni
import { useTranslations } from "next-intl";
import Logo from "../../images/logo.png";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  link: string;
  image_uri: string;
  content: string;
  locale: string; // Locale alanını ekledik
}

const News = () => {
  const t = useTranslations("News-Page");
  const { locale } = useParams(); // Şu anki dili alıyoruz
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pressReleases, setPressReleases] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null); // Modal için seçili haber
  const [activeTab, setActiveTab] = useState("latest-news"); // Aktif sekme
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/news`);

        const sortedNews = response.data
          .filter((newsItem: NewsItem) => newsItem.locale === locale)
          .sort((a: NewsItem, b: NewsItem) => Number(b.id) - Number(a.id));

        setNews(sortedNews);
      } catch (error) {
        console.error("Haberler alınamadı:", error);
      } finally {
        setLoading(false); // Yükleme tamamlandığında false yap
      }
    };

    const fetchPressReleases = async () => {
      setLoading(true); // Yükleme başladığında true yap
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/press-release`
        );

        const sortedReleases = response.data
          .filter((release: NewsItem) => release.locale === locale) // Dil filtrelemesi
          .sort((a: NewsItem, b: NewsItem) => Number(b.id) - Number(a.id));

        setPressReleases(sortedReleases);
      } catch (error) {
        console.error("Basın bültenleri alınamadı:", error);
      } finally {
        setLoading(false); // Yükleme tamamlandığında false yap
      }
    };

    if (activeTab === "latest-news") {
      fetchNews();
    } else {
      fetchPressReleases();
    }
  }, [locale, activeTab]);

  // Haber açıklamasını kısaltmak için truncate fonksiyonu
  const truncate = (text: string, maxLength: number) => {
    if (!text) {
      return ""; // Eğer text undefined veya boşsa, boş string döndür
    }

    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Yüklenme animasyonu
  if (loading) {
    return (
      <div className="bigger-container relative flex flex-col h-[500px] justify-center items-center aligns-center">
        <div className="relative duration-500 flex justify-center items-center">
          <div className="w-[100px] h-[100px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
          <div className="absolute">
            <Image src={Logo} alt="omg-logo" className="w-[70px] h-auto" />
          </div>
        </div>
        <div className="flex mt-6 text-logoGray">
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  const currentData = activeTab === "latest-news" ? news : pressReleases;

  // Eğer veri yoksa gösterilecek mesaj
  if (currentData.length === 0) {
    return (
      <div className="text-center h-[500px] text-gray-500 mt-10">
        <div className="tabs-container flex justify-center mt-10">
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === "latest-news" ? "border-b-2 border-logoRed" : ""
            }`}
            onClick={() => setActiveTab("latest-news")}
          >
            {t("latest-news")}
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              activeTab === "press-release" ? "border-b-2 border-logoRed" : ""
            }`}
            onClick={() => setActiveTab("press-release")}
          >
            {t("press-release")}
          </button>
        </div>
        <div className="tabs-container flex justify-center mt-10">
          {activeTab === "latest-news"
            ? t("not-found-news")
            : t("not-found-release")}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto team flex flex-col">
      {/* Sekmeler */}
      <div className="tabs-container flex justify-center mt-10">
        <button
          className={`px-6 py-2 font-medium ${
            activeTab === "latest-news" ? "border-b-2 border-logoRed" : ""
          }`}
          onClick={() => setActiveTab("latest-news")}
        >
          {t("latest-news")}
        </button>
        <button
          className={`px-6 py-2 font-medium ${
            activeTab === "press-release" ? "border-b-2 border-logoRed" : ""
          }`}
          onClick={() => setActiveTab("press-release")}
        >
          {t("press-release")}
        </button>
      </div>

      {/* Haberlerin Gösterimi */}
      <div className="bigger-container w-full flex flex-col gap-6 lg:my-20 my-12">
        <Container>
          <div className="w-full grid lg:grid-cols-2 gap-8">
            {/* En son yayınlanan haber büyük olarak */}
            <div className="big-news-item w-full relative lg:col-span-2 bg-[#f7f7f7] shadow-md rounded-lg p-4">
              <a
                className="news-item h-[800px] w-full flex flex-col relative"
                onClick={() => setSelectedNews(currentData[0])}
              >
                <div className="w-full h-[600px] relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={currentData[0].image_uri}
                    alt="news-img"
                    className="object-cover w-full h-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div className="text-container">
                  <h5 className="text-[24px] text-gray-500 font-bold">
                    {currentData[0].title}
                  </h5>
                  <p className="text-[14px] text-gray-500 mt-2">
                    {currentData[0].date}
                  </p>
                  <p className="text-[16px] text-gray-500 font-medium mt-2">
                    {truncate(currentData[0].content, 150)}
                  </p>
                </div>
              </a>
            </div>

            {/* Diğer haberler */}
            {currentData.slice(1).map((item, index) => (
              <div
                key={index}
                className="small-news-item bg-[#f7f7f7] shadow-md rounded-lg p-4"
              >
                <a
                  className="news-item h-[500px] w-full flex flex-col relative"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="w-full h-[60%] relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={item.image_uri}
                      alt="news-img"
                      className="object-cover w-full h-full"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="text-container">
                    <h5 className="text-[18px] text-gray-500 font-bold">
                      {item.title}
                    </h5>
                    <p className="text-[12px] text-gray-500 mt-1">
                      {item.date}
                    </p>
                    <p className="text-[14px] text-gray-500 font-medium mt-1">
                      {truncate(item.content, 80)}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Modal - Haber Detayı */}
      {selectedNews && (
        <EnhancedModal
          onClose={() => setSelectedNews(null)}
          title={selectedNews.title}
          description={selectedNews.content}
          date={selectedNews.date}
          image={selectedNews.image_uri}
          link={selectedNews.link}
        />
      )}
    </div>
  );
};

export default News;
