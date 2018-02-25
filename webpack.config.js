const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  BUILD_DIR: path.resolve(__dirname, 'src/public/'),
  APP_DIR: path.resolve(__dirname, 'src/app/'),
  CSS_DIR: path.resolve(__dirname, 'src/app/styles/')
};

const config = [
  {
    entry: path.join(paths.APP_DIR, 'index.jsx'),
    output: {
      path: paths.BUILD_DIR,
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(paths.BUILD_DIR, 'index.html'),
      }),
    ],
    devServer: {
      contentBase: paths.APP_DIR,
    },
    module : {
      loaders : [
        {
          test : /\.jsx?/,
          include : paths.APP_DIR,
          loaders: "babel-loader"
        },
        {
          test: /\.less$/,
          include : paths.APP_DIR,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.(png|jpg|gif)$/,
          include : paths.APP_DIR,
          loaders: "file-loader",
        },
      ],
    }
  }
];

module.exports = config;