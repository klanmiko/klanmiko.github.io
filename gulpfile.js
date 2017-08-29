'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
 return gulp.src('./config.sass')
   .pipe(sass().on('error', sass.logError))
   //.pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(gulp.dest('./'));
});

gulp.task('sass:watch', function () {
 gulp.watch('./config.sass', ['sass']);
});