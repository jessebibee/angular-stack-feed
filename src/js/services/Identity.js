(function () {
    'use strict';

    var serviceId = 'Identity';
    app.factory(serviceId, ['$q', '$http', Identity]);

    function Identity($q, $http) {
        return {
            quotaRemaining: null
        };
    }
})();