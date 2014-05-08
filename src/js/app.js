(function () {
    'use strict';

    var app = angular.module('app', ['ngSanitize', 'ui.bootstrap', 'ui.select2']);

    app.constant('APIKey', 'fFGxJHjVNmw4u*YZqKNLlw((');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
})();