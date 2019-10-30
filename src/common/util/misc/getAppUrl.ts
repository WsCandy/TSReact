import appConfig from "_common/config/appConfig";

const getAppUrl = (path: string): string => {
    return `${appConfig.app_url}${path}`;
};

export default getAppUrl;
