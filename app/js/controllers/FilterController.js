(function () {
    'use strict';

    var controllerId = 'FilterController';
    app.controller(controllerId, ['$scope', '$modalInstance', FilterController]);

    function FilterController($scope, $modalInstance) {
        $scope.tags = [];
        $scope.filter = {};

        $scope.addFilter = function () {
            //$scope.filters.push(filter);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();