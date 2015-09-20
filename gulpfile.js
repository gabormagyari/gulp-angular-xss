(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        jshint = require('gulp-jshint');

    var scripts = ['*.js', 'test/*.js'];
    var watcher = gulp.watch(scripts, ['jshint']);
    watcher.on('change', function(event){
        gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.task('jshint', function(){
        return gulp.src(scripts)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('test', function(){

    });

    gulp.task('develop', ['jshint']);
}());