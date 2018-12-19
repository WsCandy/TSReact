const path = require("path");
const base = require("./base.js");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = merge(base, {
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
        path: path.resolve(__dirname, "../dist")
    },
    externals: [webpackNodeExternals()]
});
