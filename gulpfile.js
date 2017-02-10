"use strict";
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var gulp = require('gulp');
var sass = require('gulp-sass');

var babel = require('gulp-babel');

gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle:'expanded'})
  .on('error',sass.logError))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('babel', function(){
  gulp.src('src/**/*.js')
      .pipe(babel())
      .on('error', handleError)
      .pipe(gulp.dest('dist'))

});


//watch task
gulp.task('default', function(){
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['babel']);
});
