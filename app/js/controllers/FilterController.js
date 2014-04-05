(function () {
    'use strict';

    var controllerId = 'FilterController';
    app.controller(controllerId, ['$scope', 'DataService', FilterController]);

    function FilterController($scope, dataService) {
        $scope.filters = [];

        $scope.addFilter = function (filter) {
            $scope.filters.push(filter);
        };

        $scope.removeFilter = function (filter) {

        };
    }
})();