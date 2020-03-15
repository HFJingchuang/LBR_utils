
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
  entry: "./src/index.ts",
  output: {
    filename: "lbr_order_rpc.min.js",
    path: path.resolve(__dirname, "./dist")
  },
  target: "web",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  mode: "production",
  node: {
    fs: "empty",
    tls: "empty",
    "child_process": "empty",
    net: "empty"
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            // 指定特定的ts编译配置，为了区分脚本的ts配置
            configFile: path.resolve(__dirname, './tsconfig.json'),
            transpileOnly: true
          },
        },
      ],
      exclude: /node_modules/,
    },]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
};

module.exports = config;