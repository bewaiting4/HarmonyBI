var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/app/public/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'public/src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};