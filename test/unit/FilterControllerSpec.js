'use strict';

describe('FilterController', function () {
    var ctrl, $scope;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        ctrl = $controller('FilterController', { '$scope': $scope });
    }));

    it('filter should be added', inject(function () {
        expect($scope.filters).toEqual(new Array());
        $scope.addFilter({});
        expect($scope.filters.length).toEqual(1);
    }));
});