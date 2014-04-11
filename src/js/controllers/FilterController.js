(function () {
    'use strict';

    var controllerId = 'FilterController';
    app.controller(controllerId, ['$scope', FilterController]);

    function FilterController($scope) {
        $scope.tags = [];
        $scope.filter = {};

        $scope.addFilter = function () {
            //$scope.filters.push(filter);
            //$modalInstance.close();
        };

        $scope.cancel = function () {
            //$modalInstance.dismiss('cancel');
        };
    }
})();