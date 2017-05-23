"use strict";
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var webserver = require('gulp-webserver');
var babel = require('gulp-babel');

gulp.task('webserver', function(){
  gulp.src('./dist')
  .pipe(webserver({
    livereload:true,
    // directoryListing:true,
    // open:true
  }));
});


gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle:'expanded'})
  .on('error',sass.logError))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('babel', function(){
  gulp.src('src/**/*.js')
      .pipe(babel())
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(gulp.dest('dist'))

});


//watch task
gulp.task('default', ['webserver'],function(){
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['babel']);
});
