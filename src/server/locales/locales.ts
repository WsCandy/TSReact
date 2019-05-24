import i18n from "i18next";
import middlware from "i18next-express-middleware";
import config from "_locales/config";

i18n.use(middlware.LanguageDetector).init(config);

export default i18n;
