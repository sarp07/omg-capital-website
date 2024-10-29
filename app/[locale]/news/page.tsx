"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/app/components/common/container";
import Image from "next/image";
import { useParams } from "next/navigation";
import EnhancedModal from "../../components/common/enhancedModal";
import PdfModal from "../../components/page_components/modals/pdfModal";
import { useTranslations } from "next-intl";
import Logo from "../../images/logo.png";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  link: string;
  image_uri: string;
  content: string;
  locale: string;
  author: string;
}

interface Announcements {
  id: number;
  title: string;
  description: string;
  date: Date;
  pdfDocument: string;
  locale: string;
  image_uri: string;
  isActive: boolean;
}

const NewsPage = () => {
  const t = useTranslations("News-Page");
  const { locale } = useParams();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pressReleases, setPressReleases] = useState<Announcements[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcements | null>(null);
  const [activeTab, setActiveTab] = useState("latest-news");
  const [loading, setLoading] = useState(true);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/news`
        );
        const sortedNews = response.data
          .filter((newsItem: NewsItem) => newsItem.locale === locale)
          .sort((a: NewsItem, b: NewsItem) => Number(b.id) - Number(a.id));
        setNews(sortedNews);
      } catch (error) {
        console.error("Haberler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPressReleases = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/press-release`
        );
        const sortedReleases = response.data
          .filter((release: Announcements) => release.locale === locale)
          .sort(
            (a: Announcements, b: Announcements) => Number(b.id) - Number(a.id)
          );
        setPressReleases(sortedReleases);
      } catch (error) {
        console.error("Duyurular alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "latest-news") {
      fetchNews();
    } else {
      fetchPressReleases();
    }
  }, [locale, activeTab]);

  const truncate = (text: string, maxLength: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxLength
      ? words.slice(0, maxLength).join(" ") + "..."
      : text;
  };

  const openPdfModal = (pdf: string) => {
    const relativePath = pdf.split("/files/")[1];
    if (relativePath) {
      setPdfFile(`${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/files/${relativePath}`);
      setShowPdfModal(true);
    }
  };

  const openNewsModal = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const openAnnouncementModal = (announcement: Announcements) => {
    setSelectedAnnouncement(announcement);
  };

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

  return (
    <div className="w-full h-auto flex flex-col">
      <div className="tabs-container pt-[60px] flex justify-center mt-10">
        <button
          className={`px-6 py-2 font-medium ${
            activeTab === "latest-news" ? "border-b-2 border-logoRed" : ""
          }`}
          onClick={() => setActiveTab("latest-news")}
        >
          {t("press-release")}
        </button>
        <button
          className={`px-6 py-2 font-medium ${
            activeTab === "press-release" ? "border-b-2 border-logoRed" : ""
          }`}
          onClick={() => setActiveTab("press-release")}
        >
          {t("announcements")}
        </button>
      </div>

      <div className="bigger-container w-full flex flex-col gap-6 lg:my-20 my-12">
        <Container>
          <div className="w-full grid lg:grid-cols-2 gap-8">
            {currentData.map((item, index) => (
              <div
                key={index}
                className="small-news-item bg-[#f7f7f7] shadow-md rounded-lg p-4 flex flex-col"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={item.image_uri || Logo}
                    alt="news-img"
                    className="rounded w-full h-[200px] object-cover"
                    width={400}
                    height={300}
                  />
                </div>
                <h5 className="text-[18px] text-gray-700 font-semibold mb-2">
                  {item.title}
                </h5>
                <p className="text-[14px] text-gray-600 mb-2">
                  {activeTab === "latest-news"
                    ? truncate((item as NewsItem).content, 50)
                    : truncate((item as Announcements).description, 50)}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[12px] text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  {activeTab === "latest-news" ? (
                    <button
                      onClick={() => openNewsModal(item as NewsItem)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {t("details")}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        openPdfModal((item as Announcements).pdfDocument)
                      }
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {t("details")}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {showPdfModal && pdfFile && (
        <PdfModal pdfFile={pdfFile} onClose={() => setShowPdfModal(false)} />
      )}

      {selectedNews && (
        <EnhancedModal
          onClose={() => setSelectedNews(null)}
          title={selectedNews.title}
          description={selectedNews.content}
          date={new Date(selectedNews.date).toLocaleDateString()}
          author={selectedNews.author}
          image={selectedNews.image_uri}
          link={selectedNews.link}
        />
      )}
    </div>
  );
};

export default NewsPage;
