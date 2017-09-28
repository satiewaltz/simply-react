const path = require("path");
const webpack = require("webpack");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  node: {
    fs: "empty",
    net: "empty"
  },

  target: "web",

  context: path.resolve(__dirname, "src"),

  entry: { "js/index": "./index.jsx" },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name].js",
    publicPath: "./dist/"
  },

  //////////////////////////////////////////////////////
  // Resolves imports - helps make importing less verbose
  resolve: {
    mainFiles: ["index"],
    extensions: [".js", ".jsx", ".scss"], // resolves imports
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules")
      // path.resolve('./src/Components'),
    ],
    alias: {
      // 'styles': path.resolve('src', 'Components/Styles')
    },
    plugins: [
      // Resolves component directory names
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/
      })
    ]
  },

  //////////////////////////////////////
  // Modules Loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader", options: { sourceMap: true } },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
              sourceMap: true,
              minimize: true
              // show original src classname in css
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [path.resolve("src", "framework/Styles")]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg|mp3)$/,
        loader: "url-loader",
        options: {
          limit: 5000,
          name: "assets/[path][name].[hash].[ext]",
          publicPath: "dist/"
        }
      },
      { parser: { amd: false } }
    ]
  },

  ////////////////////////////////////////////
  // Plugins
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CaseSensitivePathsPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      comments: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "./js/commons.js"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  devtool: "hidden-source-map"
};
