var gulp = require('gulp');
var ts = require('gulp-typescript');
var gulpTypings = require("gulp-typings");

var serverTypeScriptProject = ts.createProject('server/tsconfig.json');
var windowsTypeScriptProject = ts.createProject('windows/tsconfig.json');

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
gulp.task('ts', ['ts/server', 'ts/windows']);

gulp.task('typings/server', function () {
	return gulp.src('server/typings.json')
		.pipe(gulpTypings());
})
gulp.task('typings/windows', function () {
	return gulp.src('windows/typings.json')
		.pipe(gulpTypings());
})
gulp.task('typings', ['typings/server', 'typings/windows']);

gulp.task('default', ['ts']);
