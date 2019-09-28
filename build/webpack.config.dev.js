'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const Dotenv = require('dotenv-webpack');

const HOST = 'localhost'
const PORT = 8081

module.exports = merge(baseConfig, {
	mode: 'development',

	devServer: {
		clientLogLevel: 'warning',
		hot: true,
		contentBase: 'dist',
		compress: false,
		host: HOST,
		port: PORT,
		open: false,
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}, {
				test: /\.styl(us)?$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			}
		]
	},

	devtool: false,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.SourceMapDevToolPlugin({}),
		new Dotenv()
	]
})