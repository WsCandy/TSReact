const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const env = process.env.NODE_ENV;
const dev = env !== "production";

module.exports = merge({
    mode: env || "development",
    context: path.resolve(__dirname, "../"),
    devtool: env === "production" ? "none" : "source-map",
    stats: {
        colors: true,
        env: true
    },
    optimization: {
        minimize: !dev,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                include: /\.js$/,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ],
        splitChunks: {
            automaticNameDelimiter: ".",
            minSize: 20000,
            cacheGroups: {
                reuseExistingChunk: false,
                lib: {
                    test: /node_modules/,
                    name: "lib",
                    chunks: "all",
                    priority: -3
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
                    { loader: "cache-loader" },
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                "syntax-dynamic-import",
                                "babel-plugin-styled-components",
                                "babel-plugin-transform-assets"
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
