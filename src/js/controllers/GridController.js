(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$timeout', '$modal', '$window', 'DataContext', 'StackProxy', GridController]);

    function GridController($scope, $interval, $modal, $window, context, proxy) {
        var updateInterval = null;

        $scope.updateIntervalMins = 2; 
        $scope.lastUpdateDate = null;
        $scope.questions = [];
        $scope.filters = [{ name: 'Angularjs', includedTags: ['angularjs'], excludedTags: [] }];

        $scope.openQuestion = function (question) {
            context.addViewedQuestion(question.question_id);
            $window.open(question.link, '_blank');
        };

        $scope.questionPreviouslyViewed = function (questionId) {
            return _.contains(context.getViewedQuestions(), questionId);
        };

        $scope.initialize = function () {
            loadQuestions();
        };

        function loadQuestions() {
            proxy.getQuestions($scope.filters) //send in filters here - filters that are on
                .then(function (data) {
                    //console.log('Loaded questions');
                    $scope.questions = data.items;
                    $scope.lastUpdateDate = new Date();
                }), function (reason) {
                    alert('Failed: ' + reason);
                };

            updateInterval = $interval(loadQuestions, $scope.updateIntervalMins * 60000);
            //updateClock = $timeout(updateClockTime, 1000);
        }






        //$scope.addFilter = function () {
        //    var modalInstance = $modal.open({
        //        templateUrl: 'partials/filter.html',
        //        scope: $scope,
        //        controller: 'FilterController'
        //        //resolve: {
        //        //    items: function () {
        //        //        return $scope.items;
        //        //    }
        //        //}
        //    });

        //};

        //loadTags('stackoverflow');

        //function loadTags(site) {
        //    //load tags
        //    dataService.getTags() //send in filters here?
        //        .then(function (data) {
        //            angular.forEach(data.items, function (value, key) {
        //                $scope.tags.push({
        //                    site: site,
        //                    tag: value.name,
        //                    count: value.count
        //                })
        //            });
        //            console.log($scope.tags);
        //        }), function (reason) {
        //            alert('Failed: ' + reason);
        //        };
        //}
    }
})();