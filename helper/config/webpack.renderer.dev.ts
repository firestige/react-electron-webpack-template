import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";
import base from "./webpack.base";
import HtmlWebpackPlugin from "html-webpack-plugin";
import chalk from "chalk";
import { spawn } from "child_process";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080;
console.log(`port: ${port}`);
const config: webpack.Configuration = merge.smart(base, {
  mode: "development",
  target: "electron-renderer",
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    path.join(__dirname, "..", "..", "src/app/index.tsx"),
  ],
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
  optimization: {
    namedModules: true,
  },
  devServer: {
    port,
    publicPath: `http://localhost:${port}`,
    contentBase: path.join(__dirname, "..", "..", "dist"),
    hot: true,
    before: () => {
      console.log(chalk.greenBright("starting background process..."));
      spawn("npm", ["run", "start:background"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(code))
        .on("error", (err) => console.error(err));
    },
  },
});

export default config;
