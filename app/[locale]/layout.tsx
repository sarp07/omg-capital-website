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
        <title>OMG Capital || Official Website</title>
        <meta
          name="description"
          content="OMG Capital Investment Sharing Official Website"
        />
        <meta name="keywords" content="Omg Capital" />
        <meta name="author" content="OMG Capital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
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
