import i18n from "i18next";
import middlware from "i18next-express-middleware";
import config from "_locales/config";
import getTLD from "_server/util/getTLD";
import appConfig from "_common/config/appConfig";

const detector = new middlware.LanguageDetector();

detector.addDetector({
    name: "tld",
    lookup: req => {
        const tld = getTLD(req);

        if (typeof tld === "undefined") {
            return appConfig.baseLng;
        }

        switch (tld.tld) {
            case "it":
                return "it";
            default:
                return appConfig.baseLng;
        }
    },
    cacheUserLanguage: () => undefined
});

i18n.use(detector).init({
    ...config,
    detection: {
        order: ["tld", "cookie"]
    }
});

export default i18n;
