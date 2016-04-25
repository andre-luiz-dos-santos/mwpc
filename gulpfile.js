var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var del = require('del');

// XXX ntypescript is the version used by the TypeScript Atom plugin.
//     It currently has a newer version of TypeScript that fixes issues
//     with ‘DecodeErrorCallback’ and ‘changedTouches’.
//     The current version of the TypeScript package is 1.8.10.
var serverTypeScriptProject = ts.createProject('server/tsconfig.json', { typescript: require('ntypescript') });
var windowsTypeScriptProject = ts.createProject('windows/tsconfig.json', { typescript: require('ntypescript') });
var browserTypeScriptProject = ts.createProject('browser/tsconfig.json', { typescript: require('ntypescript') });

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
gulp.task('ts/browser', function () {
	return browserTypeScriptProject.src()
		.pipe(ts(browserTypeScriptProject))
		.pipe(gulp.dest('tmp/browser'));
});
gulp.task('ts', ['ts/server', 'ts/windows']);

gulp.task('typings/server', function () {
	return gulp.src('server/typings.json')
		.pipe(gulpTypings());
})
gulp.task('typings/windows', function () {
	return gulp.src('windows/typings.json')
		.pipe(gulpTypings());
})
gulp.task('typings/browser', function () {
	return gulp.src('browser/typings.json')
		.pipe(gulpTypings());
})
gulp.task('typings', ['typings/server', 'typings/windows', 'typings/browser']);

gulp.task('browser', ['ts/browser'], function () {
	return gulp.src('tmp/browser/index.js')
		.pipe(webpackStream({
			output: {
				filename: 'webpack.js'
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
})

gulp.task('copy/browser', function () {
	return gulp.src(['browser/**/*.{css,html}'])
		.pipe(gulp.dest('build/browser'));
})
gulp.task('copy/windows', function () {
	return gulp.src(['windows/*.{ahk,exe}'])
		.pipe(gulp.dest('build/windows'));
})
gulp.task('copy', ['copy/browser', 'copy/windows']);

gulp.task('clean', function () {
	return del([
		'build/server',
		'build/windows',
		'build/browser'
	]);
});

gulp.task('default', ['ts', 'browser', 'copy']);
