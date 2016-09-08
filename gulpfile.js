var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var del = require('del');

var serverTypeScriptProject = ts.createProject('server/tsconfig.json', { typescript: require('typescript') });
var windowsTypeScriptProject = ts.createProject('windows/tsconfig.json', { typescript: require('typescript') });

gulp.task('ts/server', function () {
	return serverTypeScriptProject.src()
		.pipe(ts(serverTypeScriptProject))
		.pipe(gulp.dest('build/server'));
});
gulp.task('ts/windows', function () {
	return windowsTypeScriptProject.src()
		.pipe(ts(windowsTypeScriptProject))
		.pipe(gulp.dest('build/windows'));
});
gulp.task('ts', ['ts/server', 'ts/windows']);

gulp.task('typings/server', function () {
	return gulp.src('server/typings.json')
		.pipe(gulpTypings());
});
gulp.task('typings/windows', function () {
	return gulp.src('windows/typings.json')
		.pipe(gulpTypings());
});
gulp.task('typings/browser', function () {
	return gulp.src('browser/typings.json')
		.pipe(gulpTypings());
});
gulp.task('typings', ['typings/server', 'typings/windows', 'typings/browser']);

gulp.task('browser', function () {
	return gulp.src('browser/index.ts')
		.pipe(webpackStream({
			output: {
				filename: 'webpack.js'
			},
			resolve: {
				extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
			},
			module: {
				loaders: [
					{ test: /\.tsx?$/, loader: 'ts-loader' }
				]
			},
			plugins: [
				new webpack.optimize.OccurrenceOrderPlugin(),
				new webpack.optimize.UglifyJsPlugin({
					comments: false,
					compress: {
						warnings: false
					}
				})
			]
		}, webpack))
		.pipe(gulp.dest('build/browser'));
});

gulp.task('copy/browser', function () {
	return gulp.src(['browser/**/*.{css,html}'])
		.pipe(gulp.dest('build/browser'));
});
gulp.task('copy/windows', function () {
	return gulp.src(['windows/*.{ahk,exe}'])
		.pipe(gulp.dest('build/windows'));
});
gulp.task('copy', ['copy/browser', 'copy/windows']);

gulp.task('clean', function () {
	return del([
		'build/server',
		'build/windows',
		'build/browser'
	]);
});

gulp.task('default', ['ts', 'browser', 'copy']);
