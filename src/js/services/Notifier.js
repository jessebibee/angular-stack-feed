(function (app) {
    'use strict';

    app.factory('notifier', notifier);

    function notifier() {
        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning
        };

        return service;

        function error(message) {
            toastr.error(message);
        }

        function info(message) {
            toastr.info(message);
        }

        function success(message) {
            toastr.success(message);
        }

        function warning(message) {
            toastr.warning(message);
        }
    }
})(angular.module('app'));