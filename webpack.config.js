const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// Resolves issues when deploying the project to case sensitive flie systems on liuux
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// Allows one to use directory names for components
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Below is to add addtional attributes to the script tag for react
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: "./main.jsx",

  ////////////////////////////////////////////
  // Output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./bundle.js",
    pathinfo: true
  },

  //////////////////////////////////////////////////////
  // Resolves imports - helps make importing less verbose
  resolve: {
    mainFields: ["browser", "module", "main"],
    extensions: [".js", ".jsx", ".scss", ".css"], // resolves imports
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules"),
      path.resolve("./src/components")
    ],
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
        test: /\.(css|sass|scss)$/,
        ////////////////////////////////////////
        use: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[name]--[local]--[hash:base64:5]",
                  sourceMap: true,
                  importLoaders: 2
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
                  includePaths: [path.resolve("src", "/styles")]
                }
              }
            ]
          })
        ),
        ////////////////////////////////////////
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "/node_modules/normalize.css")
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|mp3)$/,
        loader: "url-loader"
      },
      { parser: { amd: false } }
    ]
  },

  // ////////////////////////////////////////////
  // // Plugins
  plugins: [
    // new CaseSensitivePathsPlugin({debug: true}),
    new CaseSensitivePathsPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Generate a new index.html
    new HtmlWebpackPlugin({
      inject: "body", // inject tags into
      filename: "index.html", // file name
      template: "./template.html" // template to generate html
    }),

    new ExtractTextPlugin({
      filename: "css/style.css",
      disable: false,
      allChunks: true
    }) // this means dist/css/style.css
  ],

  // ////////////////////////////////////////////
  // // This is the config for webpack-dev-server
  devServer: {
    // Load content from bundle
    inline: true,
    compress: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    // disableHostCheck: true,
    // open: true
    ///// These options are commented out unless we need
    ///// to generate HTML on the fly.
    contentBase: path.resolve(__dirname, "dist"),

    // Slience various log levles
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      children: false,
      source: false,
      publicPath: false,
      warnings: true,
      errors: true
    }
    // should always point to a index.html
    // publicPath: '/' // should always match output dir
  },
  ////////////////////////////////////////////
  devtool: "cheap-module-eval-source-map"
};
