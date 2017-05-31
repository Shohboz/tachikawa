"use strict";

const fs = require("fs");
const findByExtension = (arr, regex) => arr.find(item => item.match(regex));

module.exports.makeAssetsConfig = function() {
  this.plugin("done", statsData => {
    const stats = statsData.toJson();
    if (!stats.errors.length) {
      const { assetsByChunkName: { src } } = stats;
      let js = findByExtension(src, /\.js$/);
      let css = findByExtension(src, /\.css$/);
      fs
        .createWriteStream("./path.config.js")
        .write(`module.exports = ${JSON.stringify({ css, js })};`);
    }
  });
};
