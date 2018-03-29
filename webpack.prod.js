const path = require("path");
const webpack = require("webpack");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputFolder = "dist";

module.exports = {
  devtool: "hidden-source-map",
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: "./main.jsx",
  target: "web",

  output: {
    path: path.resolve(__dirname, outputFolder),
    filename: "./[name].js"
    // Config publicPath to serve html file separately
    // publicPath: `./${outputFolder}/`
  },

  //////////////////////////////////////////////////////
  // Resolves imports - helps make importing less verbose
  resolve: {
    mainFiles: ["index"],
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]--[local]--[hash:base64:5]",
                sourceMap: true,
                importLoaders: 2,
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
                includePaths: [path.resolve("src", "/styles")]
              }
            }
          ]
          ////////////////////////////////////////
        }),
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "/node_modules/normalize.css")
        ]
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
    new ExtractTextPlugin({
      filename: "css/style.css",
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({ template: "./template.html" })
  ]
};
