(function (app) {
    'use strict';

    var serviceId = 'identity';
    app.factory(serviceId, ['$q', '$http', identity]);

    function identity($q, $http) {
        return {
            quotaRemaining: null,
            authenticated: false
        };
    }
})(angular.module('app'));