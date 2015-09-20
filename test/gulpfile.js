(function () {
    "use strict";

    var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        gutil = require('gulp-util'),
        xss = require('../index');

    gulp.task('valid', function () {
        gutil.log("No lines expected:");
        return gulp.src('**/valid.html')
            .pipe(xss());
    });

    gulp.task('invalid', function () {
        gutil.log("Three lines are expected:");
        return gulp.src('**/invalid.html')
            .pipe(xss());
    });

    gulp.task('invalidWithExceptions', function () {
        gutil.log("No lines expected:");
        return gulp.src('**/invalid.html')
            .pipe(xss({
                error: false,
                exceptions: [
                    {path: "testfiles/invalid.html", value: "badXss"},
                    {path: "testfiles/invalid.html", value: "reallyBadXss"},
                    {path: "testfiles/invalid.html", value: "badXssWithFilter|myfilter:badXssWithFilter"}
                ]
            }));
    });

    gulp.task('invalidWithFilters', function () {
        gutil.log("Two lines are expected:");
        return gulp.src('**/invalid.html')
            .pipe(xss({
                error: false,
                supportedFilters: ["myfilter"]
            }));
    });

    gulp.task('invalidWithExceptionsAndFilters', function () {
        gutil.log("No lines expected:");
        return gulp.src('**/invalid.html')
            .pipe(xss({
                error: false,
                exceptions: [
                    {path: "testfiles/invalid.html", value: "badXss"},
                    {path: "testfiles/invalid.html", value: "reallyBadXss"}
                ],
                supportedFilters: ["myfilter"]
            }));
    });

    gulp.task('invalidWithError', function () {
        gutil.log("Error expected");
        return gulp.src('**/invalid.html')
            .pipe(xss({error: true}));
    });

    gulp.task('default', function (callback) {
        runSequence('valid', 'invalid', 'invalidWithExceptions', 'invalidWithFilters', 'invalidWithExceptionsAndFilters', callback);
    });
}());