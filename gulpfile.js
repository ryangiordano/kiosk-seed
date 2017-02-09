"use strict";
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
  .pipe(gulp.dest('./dist/css/'))
});


//watch task
gulp.task('default', function(){
  gulp.watch('sass/**/*.scss', ['styles']);
});
