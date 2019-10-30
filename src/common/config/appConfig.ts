interface AppConfig {
    readonly app_url: string;
}

const isProduction = process.env.NODE_ENV === "production";

const appConfig: AppConfig = {
    app_url: isProduction ? "https://domain.com" : "http://localhost:8080"
};

export default appConfig;
