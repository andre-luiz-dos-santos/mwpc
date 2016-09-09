var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var del = require('del');

gulp.task('ts', ['server', 'linux', 'windows'].map(function (dir) {
	let taskName = `ts/${dir}`;
	let typescriptProject = ts.createProject(`${dir}/tsconfig.json`, { typescript: require('typescript') });
	gulp.task(taskName, function () {
		return typescriptProject.src()
			.pipe(ts(typescriptProject))
			.pipe(gulp.dest(`build/${dir}`))
	});
	return taskName;
}));

gulp.task('typings', ['server', 'linux', 'windows', 'browser'].map(function (dir) {
	let taskName = `typings/${dir}`;
	gulp.task(taskName, function () {
		return gulp.src(`${dir}/typings.json`)
			.pipe(gulpTypings());
	});
	return taskName;
}));

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
		'build/linux',
		'build/windows',
		'build/browser'
	]);
});

gulp.task('default', ['ts', 'browser', 'copy']);
