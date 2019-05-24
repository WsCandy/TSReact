import enGB from "_locales/en-GB/common.json";
import it from "_locales/it/common.json";

const config = {
    lng: "en-GB",
    resources: { "en-GB": enGB, it },
    fallbackLng: ["en-GB"],
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
    preload: ["en-GB", "it"]
};

export default config;
