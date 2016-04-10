'use strict';

let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = function () {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new ExtractTextPlugin('style.css')
  ];

  if (isProduction) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    cache: true,

    entry: [
      './frontend/app.js'
    ],

    output: {
      path: __dirname + '/build/',
      publicPath: "/",
      filename: 'bundle.js'
    },

    watch: !isProduction,

    watchOptions: {
      aggregateTimeout: 100
    },

    devtool: isProduction ? null : 'cheap-inline-module-source-map',

    plugins: plugins,

    resolve: {
      extensions: ['', '.js', '.jsx', '.css']
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          include: /frontend/,
          loader: 'babel'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("css!postcss"),
          include: /frontend/
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
          loader: 'url?name=[name].[ext]&limit=8192',
          include: /frontend/
        }
      ]
    },

    postcss: function () {
      return [autoprefixer({ browsers: ['last 2 versions'] })];
    }
  }
}();
