const merge = require('webpack-merge')
const path = require('path')
const common = require('./common')

const htdocsDir = path.resolve(__dirname, '../htdocs')

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].js',
		path: `${htdocsDir}/assets/js`,
	},
})
