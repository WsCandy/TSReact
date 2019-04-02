import i18n from "i18next";
import enGB from "_locales/en-GB.json";

i18n.init({
    resources: { "en-GB": enGB },
    fallbackLng: "en-GB",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true
    }
});

export default i18n;
