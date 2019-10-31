interface AppConfig {
    readonly app_url: string;
    readonly site_name: string;
    readonly baseLng: string;
}

const isProduction = process.env.NODE_ENV === "production";

const appConfig: AppConfig = {
    app_url: isProduction ? "https://domain.com" : "http://localhost:8080",
    site_name: "TSReact",
    baseLng: "en-GB"
};

export default appConfig;
