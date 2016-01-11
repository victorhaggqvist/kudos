/* eslint-env node */

'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var size = require('gulp-size');


gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('style', function() {
   return gulp.src('./style/kudos.scss')
       .pipe(sass({
           'outputStyle': 'compressed'
       }))
       .pipe(size({title: 'css'}))
       .pipe(rename('kudos.min.css'))
       .pipe(gulp.dest('./dist'));
});

gulp.task('style:prefixed', function() {
    return gulp.src('./style/kudos.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(size({title: 'compat css'}))
        .pipe(rename('kudos.compat.min.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('babel', ['lint'], function () {
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['babel', 'style', 'style:prefixed']);

gulp.task('watch', function() {
    gulp.watch('./src/*', ['babel']);
});
