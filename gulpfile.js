var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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

gulp.task('browser_sync', function() {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'demo/index.html'
		}
	});
});

gulp.task('default', ['browser_sync', 'run_html', 'run_js'], function() {
	gulp.watch('./demo/*.html', ['run_html']);
	gulp.watch('./src/*.js', ['run_js']);
});