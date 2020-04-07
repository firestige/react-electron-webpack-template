import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";
import base from "./webpack.base";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = merge.smart(base, {
  mode: "production",
  target: "electron-renderer",
  entry: path.join(__dirname, "..", "..", "src/app/index.tsx"),
  output: {
    path: path.join(__dirname, "..", "..", "dist"),
    filename: "renderer.js",
  },
  devtool: "#@inline-source-map",
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "..", "..", "src/app/index.html"),
    }),
  ],
});

export default config;
