import { Domain } from "tld-extract";
import appConfig from "_common/config/appConfig";

const map: { [key: string]: string } = {
    it: "it"
};

const mapTLDtoLang = (domain?: Domain): string => {
    if (typeof domain === "undefined") {
        return appConfig.baseLng;
    }

    return map[domain.tld] || appConfig.baseLng;
};

export default mapTLDtoLang;
