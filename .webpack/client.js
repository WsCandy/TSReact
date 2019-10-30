const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const path = require("path");
const base = require("./base.js");
const merge = require("webpack-merge");
const { InjectManifest } = require("workbox-webpack-plugin");
const ReactLoadablePlugin = require("react-loadable/webpack")
    .ReactLoadablePlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const env = process.env.NODE_ENV;

const config = merge(base, {
    target: "web",
    entry: {
        m: path.resolve(__dirname, "../src/client/index.tsx")
    },
    optimization: {
        minimize: env === "production",
        minimizer: [
            new TerserPlugin({
                extractComments: true
            })
        ],
        splitChunks: {
            automaticNameDelimiter: ".",
            cacheGroups: {
                components: {
                    reuseExistingChunk: false,
                    test: /components/,
                    name: "c",
                    chunks: "initial",
                    priority: -11,
                    enforce: true
                },
                lib: {
                    reuseExistingChunk: false,
                    test: /node_modules/,
                    name: "l",
                    chunks: "initial",
                    priority: -10,
                    enforce: true
                },
                react: {
                    reuseExistingChunk: false,
                    test: /react/,
                    name: "r",
                    chunks: "initial",
                    priority: -9,
                    enforce: true
                },
                dom: {
                    reuseExistingChunk: false,
                    test: /react-dom/,
                    name: "rd",
                    chunks: "initial",
                    priority: -8
                }
            }
        }
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
            template: `!!handlebars-loader?helperDirs=${path.resolve(
                __dirname,
                "../src/client/helpers"
            )}!src/client/index.ejs`,
            inject: false,
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
            defer: /m.([0-9a-f]+).js/,
            defaultAttribute: "async"
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
            workers: 1
        }),
        new ForkTsCheckerNotifierWebpackPlugin({
            excludeWarnings: true,
            skipSuccessful: true
        }),
        new InjectManifest({
            swDest: "service-worker.js",
            swSrc: "src/client/service-worker.js",
            exclude: [/.*\.(?:jpg|ejs|json|txt)$/]
        }),
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

module.exports = config;
