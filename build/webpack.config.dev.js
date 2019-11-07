'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.prod')
const rm = require('rimraf');
const nodeExternals = require('webpack-node-externals');

rm.sync('./dist')

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	// externals:[nodeExternals()],
	optimization: {
		minimize:false,
		minimizer:[],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.SourceMapDevToolPlugin({}),
	]
})
