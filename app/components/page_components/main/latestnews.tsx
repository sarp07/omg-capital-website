"use client";
import React, { useEffect, useState } from "react";
import Container from "../../common/container";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";
import Image from "next/image";
import Logo from "../../../images/logo.png";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image_uri: string;
  date: string;
}

const LatestNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [slidePerview, setSlidePerview] = useState(3);
  const t = useTranslations("LatestNews-Component");

  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/news`,
          {
            params: { locale },
          }
        );

        // Haberleri ID'ye göre büyükten küçüğe sırala
        const sortedNews = response.data.sort(
          (a: NewsItem, b: NewsItem) => Number(b.id) - Number(a.id)
        );

        setNewsItems(sortedNews);
      } catch (error) {
        console.error("Haberler alınamadı:", error);
      }
    };

    fetchNews();
  }, [locale]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 800) {
        setSlidePerview(1);
      } else if (window.innerWidth < 1200) {
        setSlidePerview(2);
      } else {
        setSlidePerview(3);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleNewsClick = (newsId: string) => {
    router.push(`/news?newsId=${newsId}`); // locale korunur
  };

  return (
    <div className="latest-news w-full h-auto flex mb-24 lg:mt-[80px] mt-10">
      <Container>
        <div className="bigger-container w-full flex flex-col gap-6">
          <h5 className="text-3xl font-bold text-center lg:text-left">
            {t("home-latest-header")}
          </h5>
          <div className="latest-news-container w-full flex overflow-x-scroll space-x-6 scrollbar-hide">
            {newsItems.length > 0 ? (
              newsItems.map((news, index) => (
                <div
                  key={news.id || index} // Eğer id yoksa index değerini kullanıyoruz
                  className="news min-w-[300px] w-[300px] flex-shrink-0 h-[300px] relative"
                  onClick={() => handleNewsClick(news.id)}
                >
                  <div className="absolute w-full h-full top-0 left-0 bg-[#00000070] z-[100]"></div>

                  <div className="w-full h-[300px]">
                    <Image
                      src={news.image_uri}
                      alt={news.title}
                      width={700}
                      height={300}
                      className="object-cover w-full h-auto"
                      priority
                    />
                  </div>

                  <div className="absolute w-full h-[106px] bg-[#00000082] left-0 bottom-0 flex flex-col py-1 px-4 text-white justify-start gap-[2px] z-[200]">
                    <div className="w-full flex justify-between items-center">
                      <h5 className="text-[19px] font-bold">{news.title}</h5>
                      <h5 className="text-[12px]">
                        {new Date(news.date).toLocaleDateString()}
                      </h5>
                    </div>
                    <p className="text-[14px] font-medium truncate">
                      {news.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative flex flex-col justify-center items-center aligns-center">
                <div className="relative duration-500 flex justify-center items-center">
                  <div className="w-[90px] h-[90px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
                  <div className="absolute">
                    <Image
                      src={Logo}
                      alt="omg-logo"
                      className="w-[70px] h-auto"
                    />
                  </div>
                </div>
                <div className="flex mt-6 text-logoGray">
                  <p>{t("loading")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LatestNews;
