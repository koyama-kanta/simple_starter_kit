const webpack = require('webpack')
const path = require('path')

const srcDir = path.resolve(__dirname, '../src')

module.exports = {
	entry: {
		main: `${srcDir}/js/index.js`,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true,
				},
			},
		],
	},
	resolve: {
		alias: {
			'~': `${srcDir}/js/`,
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			Axios: 'axios',
			Promise: 'bluebird',
		}),
	],
}
