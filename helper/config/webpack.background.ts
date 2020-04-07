import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";
import base from "./webpack.base";
import nodeExternals from "webpack-node-externals";

const config: webpack.Configuration = merge.smart(base, {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  target: "electron-main",
  entry: path.join(__dirname, "..", "..", "src/app/background.ts"),
  output: {
    filename: "background.js",
    path: path.resolve(__dirname, "..", "..", "dist"),
  },
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
});

export default config;
