
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('builds/angular-registration/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/angular-registration/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/angular-registration/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('builds/angular-registration/js/**/*', ['js']);
  gulp.watch('builds/angular-registration/css/*.css', ['css']);
  gulp.watch(['builds/angular-registration/*.html',
    'builds/angular-registration/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/angular-registration/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
