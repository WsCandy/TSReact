const merge = require("webpack-merge");
const path = require("path");

const env = process.env.NODE_ENV;

module.exports = merge({
    mode: env || "development",
    context: path.resolve(__dirname, "../"),
    devtool: env === "production" ? "none" : "eval-source-map",
    stats: {
        colors: true,
        env: true
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: ".",
            minSize: 30000,
            cacheGroups: {
                lib: {
                    reuseExistingChunk: true,
                    test: /node_modules/,
                    name: "l",
                    chunks: "initial",
                    priority: -10
                },
                react: {
                    reuseExistingChunk: true,
                    test: /react/,
                    name: "r",
                    chunks: "initial",
                    priority: -9
                }
            }
        }
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            _src: path.resolve(__dirname, "../src"),
            _server: path.resolve(__dirname, "../src/server"),
            _client: path.resolve(__dirname, "../src/client"),
            _common: path.resolve(__dirname, "../src/common"),
            _util: path.resolve(__dirname, "../src/common/util"),
            _model: path.resolve(__dirname, "../src/common/model"),
            _containers: path.resolve(__dirname, "../src/common/containers"),
            _components: path.resolve(__dirname, "../src/common/components"),
            _actions: path.resolve(__dirname, "../src/common/actions"),
            _reducers: path.resolve(__dirname, "../src/common/reducers"),
            _selectors: path.resolve(__dirname, "../src/common/selectors"),
            _svg: path.resolve(__dirname, "../src/common/svg")
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: ["cache-loader", "svg-sprite-loader", "svgo-loader"]
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
                                "react-loadable/babel"
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
                            happyPackMode: true
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: "raw-loader"
            }
        ]
    }
});
