var fs = require('fs');
var gutil = require('gulp-util');
var map = require('map-stream');

function log(message, error) {
    if (error) {
        gutil.log(gutil.colors.red("error"), message);
    } else {
        gutil.log(message);
    }
}

var defaultOptions = {
    logError: false,
    exceptions: []
};

var angularXssPlugin = function(options) {

    options = !options ? defaultOptions : {
        logError: options.logError || defaultOptions.logError,
        exceptions: options.exceptions || defaultOptions.exceptions
    };

    return map(function(file, cb){
        var fileContent = fs.readFileSync(file.path, "utf8");
        var regExp = new RegExp("ng-bind-html=\".*\"", "ig");
        var match;
        while ((match = regExp.exec(fileContent)) !== null) {

                var value = match[0].substring(match[0].indexOf("ng-bind-html=") + 14, match[0].length - 1);

                if (options.exceptions.length > 0) {
                    for (var i = 0, len = options.exceptions.length; i < len; i++) {
                        var exception = options.exceptions[i];
                        if (exception.path !== file.relative || exception.value !== value) {
                            log("Potential XSS in " + file.relative + ": " + value, options.logError);
                        }
                    }
                } else {
                    log("Potential XSS in " + file.relative + ": " + value, options.logError);
                }

        }

        cb(null, file);
    });
};

module.exports = angularXssPlugin;