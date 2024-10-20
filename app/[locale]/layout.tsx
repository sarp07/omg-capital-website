import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import { UserProvider } from "../context/UserContext";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  const messages = await getMessages();
  
  return (
    <html lang="en">
      <head>
        <title>OMG Capital || Official Website</title> {/* Sayfa başlığı */}
        <meta name="description" content="OMG Capital Investment Sharing Official Website" /> {/* Açıklama */}
        <meta name="keywords" content="Omg Capital" /> {/* Anahtar Kelimeler */}
        <meta name="author" content="OMG Capital" /> {/* Yazar */}
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Responsive ayar */}
        
        {/* Favicon ekleme */}
        <link rel="icon" type="image/png" href="/logo.png" sizes="32x32" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
