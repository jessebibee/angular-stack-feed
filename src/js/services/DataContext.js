(function () {
    'use strict';

    var serviceId = 'DataContext';
    app.factory(serviceId, ['$q', '$http', DataContext]);

    function DataContext($q, $http) {
        return {};
    }
})();