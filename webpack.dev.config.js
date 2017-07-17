var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./public/src/js/entry.jsx'],

    output: {
        path: path.join(__dirname, 'public/dist/js'),
        filename: 'bundle.js',
        publicPath: '/public/dist'
    },

    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'public/src'),
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
};