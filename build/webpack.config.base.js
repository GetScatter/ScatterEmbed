'use strict'
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')

module.exports = {
	entry : "./src/main.js",
	//devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		modules: [
			'node_modules'
		],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: 'vue-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
				}
			}, {
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('media/[name].[ext]')
					}
				}
			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('img/[name].[ext]')
					}
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: utils.assetsPath('fonts/[name].[ext]')
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.ejs',
			inject: true,
			chunksSortMode: 'none'
		}),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin([{
			from: utils.resolve('static'),
			to: utils.resolve('dist/static'),
			toType: 'dir'
		}]),
		new Dotenv()
	]
}
