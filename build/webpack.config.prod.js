'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const rm = require('rimraf');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

rm.sync('./dist')

module.exports = merge(baseConfig, {
	mode: 'production',
	devtool: '',
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: false, // Must be set to true if using source-maps in production
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					module: false,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_classnames: undefined,
					keep_fnames: false,
					safari10: false,
				}
			})
		],
		namedModules: false,
		namedChunks: false,
		nodeEnv: 'production',
		flagIncludedChunks: true,
		occurrenceOrder: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		noEmitOnErrors: true,
		checkWasmTypes: true,
		minimize: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					maxSize: 250000,
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css?$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new MiniCssExtractPlugin({
			filename: 'main.css'
		}),

		// TODO: Brotli will lower sizes considerably
		// new BrotliPlugin({
		// 	asset: '[path].br[query]',
		// 	test: /\.(js|css|html|svg)$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// })


		new WebpackShellPlugin({
			// onBuildStart:['node scripts/pre-pack'],
			onBuildEnd:['node scripts/post-pack']
		})
	]
})
