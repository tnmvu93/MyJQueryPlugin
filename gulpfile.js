var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var bootlint = require('gulp-bootlint');

gulp.task('run_html', function() {
	return gulp.src('./demo')
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('run_js', function() {
	return gulp.src('./src/*.js')
		.pipe(gulp.dest('./dest'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('run_css', function() {
	return gulp.src('./src/*.css')
		.pipe(gulp.dest('./dest'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser_sync', function() {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'demo/index.html'
		}
	});
});

gulp.task('run_bootlint', function(){
	return gulp.src('./demo/index.html')
		.pipe(bootlint({
			loglevel: 'debug',
			reportFn: function (file, lint, isError, isWarning, errorLocation) {
				var message = (isError) ? "ERROR! - " : "WARN! - ";
				if (errorLocation) {
					message += file.path + ' (line:' + (errorLocation.line+1) + ', col:' + (errorLocation.column+1) + ') [' + lint.id + '] ' + lint.message;
				} else {
					message += file.path + ': ' + lint.id + ' ' + lint.message;
				}
				console.log(message);
			}
		}));
});

gulp.task('default', ['browser_sync', 'run_html', 'run_js', 'run_css', 'run_bootlint'], function() {
	gulp.watch('./demo/*.html', ['run_html']);
	gulp.watch('./src/*.js', ['run_js']);
	gulp.watch('./src/*.css', ['run_css'])
});