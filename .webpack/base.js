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
                    chunks: "all",
                    priority: -3
                },
                react: {
                    reuseExistingChunk: true,
                    test: /react/,
                    name: "r",
                    chunks: "all",
                    priority: -1
                }
            }
        }
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            "@src": path.resolve(__dirname, "../src"),
            "@server": path.resolve(__dirname, "../src/server"),
            "@client": path.resolve(__dirname, "../src/client"),
            "@common": path.resolve(__dirname, "../src/common"),
            "@util": path.resolve(__dirname, "../src/common/util"),
            "@model": path.resolve(__dirname, "../src/common/model"),
            "@containers": path.resolve(__dirname, "../src/common/containers"),
            "@actions": path.resolve(__dirname, "../src/common/actions"),
            "@reducers": path.resolve(__dirname, "../src/common/reducers"),
            "@selectors": path.resolve(__dirname, "../src/common/selectors")
        }
    },
    module: {
        rules: [
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
                            )
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
