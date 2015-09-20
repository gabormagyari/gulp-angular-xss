(function () {
    "use strict";

    var gulp = require('gulp'),
        xss = require('../index');

    gulp.task('valid', function () {
        gulp.src('valid.html')
            .pipe(xss());
    });

    gulp.task('invalidWithException', function () {
        gulp.src('invalid.html')
            .pipe(xss({
                error: false,
                exceptions: [
                    {path: "invalid.html", value: "badXss"},
                    {path: "invalid.html", value: "reallyBadXss"},
                    {path: "invalid.html", value: "badXssWithFilter|myfilter:badXssWithFilter"}
                ]
            }));
    });

    gulp.task('invalidWithExceptionAndFilter', function () {
        gulp.src('invalid.html')
            .pipe(xss({
                error: false,
                exceptions: [
                    {path: "invalid.html", value: "badXss"},
                    {path: "invalid.html", value: "reallyBadXss"}
                ],
                supportedFilters: ["myfilter"]
            }));
    });

    gulp.task('invalid', function () {
        gulp.src('invalid.html')
            .pipe(xss());
    });

    gulp.task('invalidWithError', function () {
        gulp.src('invalid.html')
            .pipe(xss({error: true}));
    });

    gulp.task('default', ['valid', 'invalidWithException', 'invalidWithExceptionAndFilter', 'invalid'], function(){
    });
}());