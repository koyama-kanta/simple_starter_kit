module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es6: true,
	},
	extends: ['prettier'],
	plugins: ['prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'space-before-blocks': ['error'],
		'space-in-parens': ['error', 'never'],
		'switch-colon-spacing': ['error', { after: true, before: false }],
		'arrow-body-style': ['error', 'as-needed'],
		'prettier/prettier': [
			'error',
			{
				semi: false,
				singleQuote: true,
				quoteProps: 'consistent',
				arrowParens: 'avoid',
			},
		],
	},
	globals: {
		Axios: true,
		Promise: true,
		APP: true,
		API: true,
		GETAPI: true,
	},
}
