const path = require("path");
const base = require("./base.js");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const config = merge(base, {
    target: "node",
    node: {
        __dirname: false
    },
    devtool: "none",
    entry: {
        m: path.resolve(__dirname, "../src/server/index.ts")
    },
    output: {
        filename: "index.js",
        chunkFilename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    externals: [
        webpackNodeExternals({
            whitelist: ["ress"]
        })
    ],
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: path.resolve(
                __dirname,
                "../reports/server-chunk-report.html"
            ),
            excludeAssets: /\.hot-update.js$/,
            openAnalyzer: false
        })
    ]
});

module.exports = config;
