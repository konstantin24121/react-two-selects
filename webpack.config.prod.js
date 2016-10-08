'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/index',

	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	resolve: {
		root: path.resolve(__dirname),
		alias: {
			'@nm': 'node_modules',
			'@app': 'src',
			'@static': 'static'
		},
		extensions: ['', '.css', '.js', '.jsx', '.scss']
	},

	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: { warnings: false }
		})
	],

	module: {
		loaders: [{
			test: /\.js(x)?$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('css!postcss!sass')
		}, {
			test: /\.css$/,
			loaders: ['style', 'css']
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader'
		}]
	},

	postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
};
