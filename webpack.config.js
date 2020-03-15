
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  entry: "./src/index.ts",
  output: {
    filename: "lbr_utils.min.js",
    path: path.resolve(__dirname, "./dist"),
    library: "lbr_utils",
    libraryTarget: "umd"
  },
  devtool: false,
  target: "web",
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "bignumber.js": path.resolve(__dirname, "node_modules/bignumber.js"),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, './tsconfig.json') })]
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
            transpileOnly: true
          },
        }
      ],
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
};

module.exports = config;