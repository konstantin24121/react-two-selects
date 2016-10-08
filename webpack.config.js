'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',

	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index'
	],

	resolve: {
		root: path.resolve(__dirname),
		alias: {
			'@nm': 'node_modules',
			'@app': 'src',
			'@static': 'static'
		},
		extensions: ['', '.css', '.js', '.jsx', '.scss']
	},

	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		loaders: [{
			test: /\.js(x)?$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.css$/,
			loaders: ['style', 'css']
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader'
		}]
	},
};
