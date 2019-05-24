import i18n from "i18next";
import config from "_locales/config";

const lng =
    typeof document !== "undefined" ? document.documentElement.lang : undefined;

i18n.init({ ...config, lng });

export default i18n;
