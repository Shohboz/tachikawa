"use strict";

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CONFIG_PATH = "config/webpack";
const TARGET = process.env.npm_lifecycle_event;

let env;
switch (TARGET) {
  case "dev-client":
    env = "dev";
    break;
  default:
    env = "production";
    break;
}

const PATHS = {
  src: path.resolve(__dirname, "client"),
  build: path.resolve(__dirname, "static"),
  shared: path.resolve(__dirname, "shared")
};

process.env.BABEL_ENV = TARGET;

module.exports = require("webpack-merge").smart(
  {
    context: PATHS.src,
    entry: {
      src: ["index"]
    },
    output: {
      path: PATHS.build,
      publicPath: "/",
      filename: "bundle.[hash:8].js",
      chunkFilename: "chunk_[name].[chunkhash:6].js"
    },
    module: {
      rules: [
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "/static/"
              }
            }
          ]
        },
        {
          test: /\.css$|\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          })
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader"
            }
          ],
          exclude: path.join(__dirname, "node_modules/*")
        }
      ]
    },

    resolve: {
      alias: {
        shared: PATHS.shared
      },
      modules: ["node_modules", PATHS.src, PATHS.shared],
      extensions: [".js", ".jsx"]
    }
  },
  require(path.join(__dirname, CONFIG_PATH, env))(__dirname),
  {
    plugins: [require("./plugins/webpack.assets").makeAssetsConfig]
  }
);
