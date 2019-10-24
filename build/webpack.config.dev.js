'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.prod')
const rm = require('rimraf');

rm.sync('./dist')

module.exports = merge(baseConfig, {
	mode: 'production',
	devtool: 'eval',
	optimization: {
		minimize:false,
		minimizer:[],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.SourceMapDevToolPlugin({}),
	]
})
