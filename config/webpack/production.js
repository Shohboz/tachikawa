"use strict";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const root = require("path").join(__dirname, "../../");
const PATHS = {
  root
};

module.exports = () => ({
  plugins: [
    new CleanWebpackPlugin("static", {
      root: PATHS.root,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: "style/bundle-[hash:6].css",
      allChunks: true
    })
  ]
});
