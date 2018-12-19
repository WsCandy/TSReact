const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const base = require("./base.js");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = merge(base, {
    target: "web",
    entry: {
        m: path.resolve(__dirname, "../src/client/index.ts")
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        contentBase: path.resolve("../dist/public"),
        compress: false,
        overlay: {
            warnings: true,
            errors: true
        },
        disableHostCheck: true,
        stats: {
            colors: true
        },
        proxy: {
            "**": {
                target: "http://localhost:4000",
                changeOrigin: true
            }
        },
        watchOptions: {
            ignored: /node_modules/
        }
    },
    output: {
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "../dist/public/assets/"),
        publicPath: "/assets/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "../dist/index.ejs"),
            template: "src/client/index.ejs",
            inject: "head",
            chunksSortMode: "none",
            alwaysWriteToDisk: true,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: false
            }
        }),
        new HtmlWebpackHarddiskPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: path.resolve(
                __dirname,
                "../reports/client-chunk-report.html"
            ),
            excludeAssets: /\.hot-update.js$/,
            openAnalyzer: false
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: "**/*",
                    to: path.resolve(__dirname, "../dist/public")
                }
            ],
            { context: path.resolve(__dirname, "../src/client/static/") }
        )
    ]
});
