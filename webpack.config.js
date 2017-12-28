
let path = require("path");
let webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax",
            css: "vue-style-loader!css-loader",
            ts: "ts-loader!tslint-loader"
          }
          // other vue-loader options go here
        }
      },
      {
        enforce: "pre",
        test: /\.tsx?$/,
        loader: "tslint-loader",
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    publicPath: "/",
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        // 画像をコピー
        from: "./src/images",
        to: "images"
      },
      {
        // HTMLをコピー
        from: "./index.html"
      },
    ])
  ],
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}

if (process.env.NODE_ENV === "development") {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    })
  ]);
}