const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    app: "./app/app.js",
    vendor: ["vue", "axios", "vuex", "debounce", "vue-router"],
  },
  watchOptions: {
    poll: true,
  },
  output: {
    path: path.resolve("../public/assets"),
    filename: "app.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "img/[name].[ext]",
            emitFile: false,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"],
        }),
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
    }),
    new ExtractTextPlugin("app.css"),
  ],
};

if (process.env.NODE_ENV === "production") {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}
