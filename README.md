# gulp-angular-xss
Anti-xss gulp plugin for angular. Optionally prohibits the use of ng-bind-html.

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
            // treat matches as error
            error: false,
            // filter out based on file path and value
            exceptions: [
                // ng-bind-html="badXss" from invalid.html will be filtered out
                {path: "invalid.html", value: "badXss"}
            ],
            // filter out based on filter value
            supportedFilters: [
                // attributes like ng-bind-html="something | myfilter: something" will be filtered out
                "myfilter"
            ]
        }));
});
```

