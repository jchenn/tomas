var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test:util', function() {
  return gulp.
    src('test/util-spec.js').
    pipe(mocha());
});

gulp.task('test:dao', function() {
  return gulp.
    src('test/dao-spec.js').
    pipe(mocha());
});

gulp.task('test:api', function() {
  return gulp.
    src('test/api-spec.js').
    pipe(mocha());
});