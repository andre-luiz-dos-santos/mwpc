var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");

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
		.pipe(gulp.dest('server'));
});
gulp.task('ts/windows', function () {
	return windowsTypeScriptProject.src()
		.pipe(ts(windowsTypeScriptProject))
		.pipe(gulp.dest('windows'));
});
gulp.task('ts/browser', function () {
	return browserTypeScriptProject.src()
		.pipe(ts(browserTypeScriptProject))
		.pipe(gulp.dest('browser'));
});
gulp.task('ts', ['ts/server', 'ts/windows', 'ts/browser']);

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

gulp.task('default', ['ts']);
