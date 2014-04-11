(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$timeout', '$window', 'Notifier', 'DataContext', 'StackProxy', GridController]);

    function GridController($scope, $interval, $window, notifier, context, proxy) {
        var updateInterval = null;

        $scope.updateIntervalMins = 1; 
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
                    var newQuestionsCount = getTotalNewQuestions(data.items);
                    $scope.questions = data.items;
                    $scope.lastUpdateDate = new Date();
                    if (newQuestionsCount) {
                        notifier.success('Loaded ' + newQuestionsCount + ' questions');
                    }
                }), function (reason) {
                    notifier.error('Failed: ' + reason);
                };

            updateInterval = $interval(loadQuestions, $scope.updateIntervalMins * 60000);
            //updateClock = $timeout(updateClockTime, 1000);
        }

        function getTotalNewQuestions(newQuestions) {
            var oldQuestionIds = [];
            var newQuestionIds = [];
            for (var i = 0; i < $scope.questions.length; i++) {
                oldQuestionIds.push($scope.questions[i].question_id);
            }
            for (var i = 0; i < newQuestions.length; i++) {
                newQuestionIds.push(newQuestions[i].question_id);
            }

            return _.difference(newQuestionIds, oldQuestionIds).length;
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