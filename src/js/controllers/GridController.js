﻿(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$timeout', '$modal', 'StackProxy', GridController]);

    function GridController($scope, $interval, $modal, proxy) {
        var updateInterval = null;

        $scope.updateIntervalMins = 2; 
        $scope.lastUpdateDate = null;
        $scope.questions = [];
        $scope.filters = [{ name: 'Angularjs', includedTags: ['angularjs'], excludedTags: [] }];

        $scope.addFilter = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/filter.html',
                scope: $scope,
                controller: 'FilterController'
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });

        };

        $scope.selectQuestion = function (question) {
            console.log(question.link);
            //TODO: probably want to expand details here of question here???
            //Mark the row in the table as 'clicked'
        };

        $scope.initialize = function () {
            loadQuestions();
        };

        ////reset the timer
        //$scope.$watch('updateIntervalMins', function (newVal, oldVal) {
        //    resetTimer(newVal);
        //});

        
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




        //function updateClockTime() {
        //    $scope.clock = new Date();
        //    updateClock = $timeout(updateClockTime, 1000);
        //};

        //function resetTimer(mins) {
        //    $interval.cancel(updateTimer);
        //    //$timeout.cancel(updateClock);
        //    updateTimer = $interval(loadQuestions, mins * 60000);
        //    //updateClock = $timeout(updateClock, 1000);
        //}

        





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