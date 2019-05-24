const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const base = require("./base.js");
const merge = require("webpack-merge");
const { InjectManifest } = require("workbox-webpack-plugin");
const ReactLoadablePlugin = require("react-loadable/webpack")
    .ReactLoadablePlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = merge(base, {
    target: "web",
    entry: {
        m: path.resolve(__dirname, "../src/client/index.tsx")
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
        filename: "assets/[name].[hash].js",
        chunkFilename: "assets/[name].[chunkhash].js",
        path: path.resolve(__dirname, "../dist/public/"),
        publicPath: "/"
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
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                conservativeCollapse: false
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: "defer"
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
        new ReactLoadablePlugin({
            filename: path.resolve(__dirname, "../dist/react-loadable.json")
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: "**/*",
                    to: path.resolve(__dirname, "../dist/public")
                }
            ],
            { context: path.resolve(__dirname, "../src/client/static/") }
        ),
        new ForkTsCheckerWebpackPlugin({
            useTypescriptIncrementalApi: true
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            excludeWarnings: true,
            skipSuccessful: true
        }),
        new InjectManifest({
            swDest: "service-worker.js",
            swSrc: "src/client/service-worker.js",
            exclude: [/.*\.(?:jpg|ejs|json|txt)$/]
        })
    ]
});
