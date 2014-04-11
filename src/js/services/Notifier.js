(function () {
    'use strict';

    app.factory('Notifier', Notifier);

    function Notifier() {
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
})();