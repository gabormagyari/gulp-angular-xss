var gulp = require('gulp');
var gutil = require('gulp-util');

var xss = require('../index');

gulp.task('valid', function(){
    gulp.src('valid.html')
        .pipe(xss());
});

gulp.task('invalid', function(){
    gulp.src('invalid.html')
        .pipe(xss());
});

gulp.task('invalidWithException', function(){
    var options = {
        logError: true,
        exceptions: [{path: 'invalid.html', value: 'bad xss'}]
    };

    gulp.src('invalid.html')
        .pipe(xss(options));
});