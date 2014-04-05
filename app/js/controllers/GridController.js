(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$timeout', 'DataService', 'IdentityService', GridController]);

    function GridController($scope, $timeout, dataService, identity) {
        $scope.quotaRemaining = identity.quotaRemaining;
        $scope.tags = [];
        $scope.questions = {};
        $scope.filters = {};

        $scope.selectQuestion = function (question) {
            console.log(question.link);
            //TODO: probably want to expand details here of question here???
            //Mark the row in the table as 'clicked'
        };

        //TODO - Start here as a test case
        $scope.removeQuestion = function (question) {
            console.log('removing', question);
        };

        $scope.initialize = function () {
            dataService.getQuestions('angularjs') //send in filters here?
                .then(function (data) {
                    console.log(data);
                    $scope.questions = data.items;
                }), function (reason) {
                    alert('Failed: ' + reason);
                };
        };

        $scope.initialize(); //just for now

        //loadTags('stackoverflow');

        function loadTags(site) {
            //load tags
            dataService.getTags() //send in filters here?
                .then(function (data) {
                    angular.forEach(data.items, function (value, key) {
                        $scope.tags.push({
                            site: site,
                            tag: value.name,
                            count: value.count
                        })
                    });
                    console.log($scope.tags);
                }), function (reason) {
                    alert('Failed: ' + reason);
                };
        }

        function fetchNewQuestions() {
            //look at the timeout interval and modify the filters object to be the startdate?
        }
    }
})();