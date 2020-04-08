const merge = require('webpack-merge')
const path = require('path')
const common = require('./common')

const distDir = path.resolve(__dirname, '../dist')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		path: `${distDir}/assets/js`,
	},
	devServer: {
		contentBase: `${distDir}`,
		publicPath: '/assets/js/',
		port: 3000,
		host: '0.0.0.0',
		open: true,
	},
})
