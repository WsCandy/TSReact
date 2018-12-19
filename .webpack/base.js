const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const env = process.env.NODE_ENV;
const dev = env !== "production";

module.exports = merge({
    mode: env || "development",
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
            "@containers": path.resolve(__dirname, "../src/common/containers")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ["syntax-dynamic-import"]
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
