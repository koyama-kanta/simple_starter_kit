const path = require('path')
const { src, dest, series, parallel, watch } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const rimraf = require('rimraf')
const cpx = require('cpx')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')
const htdocsDir = path.resolve(__dirname, 'htdocs')

const dev = {
	clean: cb => {
		rimraf(`${distDir}`, cb)
	},
	html: () =>
		src([`${srcDir}/html/**/*.pug`, `!${srcDir}/html/**/__*/*.pug`])
			.pipe(
				pug({
					pretty: true,
					basedir: `${srcDir}/html`,
				})
			)
			.pipe(dest(`${distDir}`)),
	css: () =>
		src(`${srcDir}/css/**/*.scss`)
			.pipe(sass())
			.pipe(dest(`${distDir}/assets/css`)),
	copy: cb => {
		cpx.copy(`${srcDir}/static/**/*`, `${distDir}`, cb)
	},
}

const prod = {
	clean: cb => {
		rimraf(`${htdocsDir}`, cb)
	},
	html: () =>
		src([`${srcDir}/html/**/*.pug`, `!${srcDir}/html/**/__*/*.pug`])
			.pipe(
				pug({
					pretty: true,
					basedir: `${srcDir}/html`,
				})
			)
			.pipe(dest(`${htdocsDir}`)),
	css: () =>
		src(`${srcDir}/css/**/*.scss`)
			.pipe(
				sass({
					outputStyle: 'compressed',
				})
			)
			.pipe(dest(`${htdocsDir}/assets/css`)),
	copy: cb => {
		cpx.copy(`${srcDir}/static/**/*`, `${htdocsDir}`, cb)
	},
}

const watchStatic = () => {
	watch(`${srcDir}/html/**/*`, dev.html)
	watch(`${srcDir}/css/**/*`, dev.css)
	watch(`${srcDir}/static/**/*`, dev.copy)
}

exports.default = series(
	dev.clean,
	parallel(dev.html, dev.css, dev.copy),
	watchStatic
)
exports.build = series(prod.clean, parallel(prod.html, prod.css, prod.copy))
