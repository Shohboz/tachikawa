"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => ({
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: 8051,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new ExtractTextPlugin({ filename: "style/bundle.css", allChunks: true })
  ]
});
