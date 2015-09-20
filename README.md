# gulp-angular-xss
Anti-xss gulp plugin for angular. Prohibits the use of ng-bind-html.

First install gulp-angular-xss
```shell
npm install --save-dev gulp-angular-xss
```


Usage:
```javascript
var xss = require('gulp-angular-xss');

gulp.src('invalid.html')
    .pipe(xss());
```

Options:
```javascript
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
```

