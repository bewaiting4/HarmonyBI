const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: ['./public/src/js/entry.jsx'],

    output: {
        path: path.join(__dirname, 'public/dist/js'),
        filename: 'bundle.js',
        publicPath: '.public/dist'
    },

    plugins: [new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    })],

    module: {
        loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules"
            }
        ]
    }
};