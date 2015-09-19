# gulp-angular-xss
Anti xss gulp plugin for angular. Prohibits the use of ng-bind-html.

First install gulp-angular-xss
```shell
npm install --save-dev gulp-angular-xss
```


Usage:
```javascript
const xss = require('gulp-angular-xss');

var options = {
    logError: true,
    exceptions: [{path: 'invalid.html', value: 'bad xss'}]
};

gulp.src('invalid.html')
    .pipe(xss(options));
```