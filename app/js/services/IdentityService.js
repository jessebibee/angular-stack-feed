(function () {
    'use strict';

    var serviceId = 'IdentityService';
    app.factory(serviceId, ['$q', '$http', IdentityService]);

    function IdentityService($q, $http) {
        return {
            quotaRemaining: null
        };
    }
})();