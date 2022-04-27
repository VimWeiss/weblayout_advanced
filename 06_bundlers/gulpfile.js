const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const del = require('del');
const tiny = require('gulp-tinypng-compress');
const browserSync = require('browser-sync').create()

const clean = () => {
	return del(['dist'])
}

const resources = () => {
	return src('src/resources/**')
		.pipe(dest('dist/resources'))
}

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const images = () => {
    return src([
        'src/images/**.jpg',
         'src/images/**.png', 
         'src/images/**.jpeg',
         'src/images/*.svg'
    ])
    .pipe(image())
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
}

const imgToApp = () => {
	return src(['src/images/**.jpg', 'src/images/**.png', 'src/images/**.jpeg'])
		.pipe(dest('dist/img'))
}

const svgSprites = () => {
	return src('src/images/**/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('dist/img'))
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const script = () => {
	return src('src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))
		.pipe(browserSync.stream());
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
}


watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/**.jpg', imgToApp)
watch('src/images/**.png', imgToApp)
watch('src/images/**.jpeg', imgToApp)
watch('src/images/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/js/**/*.js', script)
watch('src/resources/**', resources);

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.default = series(clean, htmlMinify, scripts, script, styles, resources, imgToApp, images, svgSprites, watchFiles)

// const tinypng = () => {
//     return src(['src/images/**.jpg', 'src/images/**.png', 'src/images/**.jpeg'])
//     .pipe(tiny({
//         key: '',
//         log: true
//     }))
//     .pipe(dest('dist'))
// }


const cleanBuild = () => {
	return del(['build'])
}

const stylesBuild = () => {
    return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('build'))
}

const htmlBuild = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('build'))
}

const scriptsBuild = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('build'))
}

const scriptBuild = () => {
	return src('src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('build'))
}

exports.build = series(cleanBuild, htmlBuild, scriptsBuild, scriptBuild, stylesBuild, resources, imgToApp, images, svgSprites, watchFiles)