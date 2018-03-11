const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  BUILD_DIR: path.resolve(__dirname, 'src/public/'),
  APP_DIR: path.resolve(__dirname, 'src/'),
  CSS_DIR: path.resolve(__dirname, 'src/app/styles/')
};

const config = [
  {
    entry: path.join(paths.APP_DIR, 'App.js'),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(paths.BUILD_DIR, 'index.html'),
      }),
    ],
    devServer: {
      contentBase: paths.APP_DIR,
    },
    externals: {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
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