(function () {
    'use strict';

    var controllerId = 'MainController';

    app.controller(controllerId, ['$scope', 'DataService', MainController]);

    function MainController($scope, dataService) {
        $scope.testMessage = 'testing message';
        $scope.questions = {};

        init();

        function init() {
            dataService.getQuestions('angularjs')
                    .then(function (data) {
                        //console.log(data);
                        $scope.questions = data.items;
                    }), function (reason) {
                        alert('Failed: ' + reason);
                    };
        }
    }
})();