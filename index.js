(function () {
    'use strict';

    var fs = require("fs"),
        gutil = require("gulp-util"),
        through = require("through2"),
        _ = require("lodash"),
        colors = gutil.colors,
        PluginError = gutil.PluginError;

    function log(message, error) {
        if (error) {
            gutil.log(colors.red("error"), message);
        } else {
            gutil.log(message);
        }
    }

    var defaultOptions = {
        error: false,
        exceptions: [],
        supportedFilters: []
    };

    function getActualOptions(options) {
        return !options ? defaultOptions : {
            error: options.error || defaultOptions.error,
            exceptions: options.exceptions || defaultOptions.exceptions,
            supportedFilters: options.supportedFilters || defaultOptions.supportedFilters
        };
    }

    var analyzeNgBindHtml = function (file, content, options) {
        var hasError = false;
        var regExp = /ng-bind-html="[^"]*"/g;
        var match;
        while ((match = regExp.exec(content))) {
            var expression = match[0].replace("ng-bind-html=", "").replace(/"/g, "");

            /* jshint loopfunc: true */
            var filterMatch = function (filter) {
                return new RegExp("[|]\\s*" + filter + "\\s*:").test(expression);
            };

            var exceptionMatch = function (exception) {
                return exception.path.replace(/\\/g, "/") === file.relative.replace(/\\/g, "/") && exception.value === expression;
            };

            if (_.findIndex(options.supportedFilters, filterMatch) === -1 &&
                _.findIndex(options.exceptions, exceptionMatch) === -1) {
                log("Potential XSS in " + file.relative + ": " + match + "!", options.error);
                hasError |= options.error;
            }
        }

        return hasError;
    };

    var angularXssPlugin = function (options) {
        options = getActualOptions(options);
        var hasError = false;
        return through.obj(function (file, encoding, callback) {
            if (file.isStream()) {
                this.emit("error", new PluginError("gulp-angular-xss", "Streams are not supported."));
                return callback();
            }

            if (file.isBuffer()) {
                var fileContent = file.contents.toString();
                if (analyzeNgBindHtml.call(this, file, fileContent, options)){
                    hasError = true;
                }
            }

            this.push(file);
            callback();
        }, function(callback){
            if (hasError) {
                this.emit("error", new PluginError("gulp-angular-xss", "At least one potential XSS found!"));
            }
            callback();
        });
    };

    module.exports = angularXssPlugin;
}());