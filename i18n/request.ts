import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locales = routing.locales as readonly string[];
    const locale =
        requested && locales.includes(requested) ? requested : routing.defaultLocale;
    if (requested && !locales.includes(requested)) notFound();
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
