(function () {
    'use strict';

    var serviceId = 'FilterService';
    app.factory(serviceId, ['$q', '$http', FilterService]);

    function FilterService($q, $http) {
        return {
            
        };
    }
})();