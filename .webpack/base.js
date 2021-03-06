const imageminMozjpeg = require("imagemin-mozjpeg");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const merge = require("webpack-merge");
const path = require("path");
const env = process.env.NODE_ENV;

module.exports = merge({
    mode: env || "development",
    context: path.resolve(__dirname, "../"),
    devtool: env === "production" ? "none" : "source-map",
    stats: {
        colors: true,
        env: true
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            _src: path.resolve(__dirname, "../src"),
            _server: path.resolve(__dirname, "../src/server"),
            _client: path.resolve(__dirname, "../src/client"),
            _images: path.resolve(__dirname, "../src/client/images"),
            _common: path.resolve(__dirname, "../src/common"),
            _util: path.resolve(__dirname, "../src/common/util"),
            _model: path.resolve(__dirname, "../src/common/model"),
            _containers: path.resolve(__dirname, "../src/common/containers"),
            _components: path.resolve(__dirname, "../src/common/components"),
            _locales: path.resolve(__dirname, "../src/common/locales"),
            _actions: path.resolve(__dirname, "../src/common/actions"),
            _reducers: path.resolve(__dirname, "../src/common/reducers"),
            _selectors: path.resolve(__dirname, "../src/common/selectors"),
            _svg: path.resolve(__dirname, "../src/common/svg"),
            _hooks: path.resolve(__dirname, "../src/common/hooks"),
            _contexts: path.resolve(__dirname, "../src/common/contexts")
        }
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/i,
                use: [
                    "cache-loader",
                    {
                        loader: "responsive-loader",
                        options: {
                            adapter: require("responsive-loader/sharp"),
                            placeholder: true,
                            placeholderSize: 50,
                            sizes:
                                env === "production"
                                    ? [600, 980, 1440, 2880]
                                    : null,
                            name: "[name].[hash]-[width].[ext]",
                            publicPath: "/img",
                            outputPath: "public/img"
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: ["svg-sprite-loader", "svgo-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "cache-loader",
                    "to-string-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    "cache-loader",
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                "babel-plugin-styled-components",
                                "syntax-dynamic-import",
                                "@loadable/babel-plugin",
                                "@babel/plugin-proposal-optional-chaining",
                                "@babel/plugin-proposal-nullish-coalescing-operator"
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(
                                __dirname,
                                "../tsconfig.json"
                            ),
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: "raw-loader"
            }
        ]
    },
    plugins: [
        new ImageminPlugin({
            disable: env !== "production",
            test: /\.(jpe?g|png|gif)$/,
            pngquant: { quality: "50-75" },
            plugins: [
                imageminMozjpeg({
                    quality: 60,
                    progressive: true
                })
            ]
        })
    ]
});
