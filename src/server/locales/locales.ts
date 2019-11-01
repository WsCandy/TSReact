import i18n from "i18next";
import middlware from "i18next-express-middleware";
import config from "_locales/config";
import getTLD from "_server/util/getTLD";
import mapTLDtoLang from "_server/locales/mapTLDtoLang";

const detector = new middlware.LanguageDetector();

detector.addDetector({
    name: "tld",
    lookup: req => mapTLDtoLang(getTLD(req)),
    cacheUserLanguage: () => undefined
});

i18n.use(detector).init({
    ...config,
    detection: {
        order: ["tld", "cookie"]
    }
});

export default i18n;
