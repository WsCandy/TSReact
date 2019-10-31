import baseLng from "_locales/base/common.json";
import it from "_locales/it/common.json";
import appConfig from "_common/config/appConfig";

const config = {
    lng: appConfig.baseLng,
    resources: { [appConfig.baseLng]: baseLng, it },
    fallbackLng: [appConfig.baseLng],
    debug: false,
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: false
    },
    preload: [appConfig.baseLng, "it"]
};

export default config;
