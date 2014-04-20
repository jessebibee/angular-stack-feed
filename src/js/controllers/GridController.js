(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$timeout', '$window', 'Notifier', 'DataContext', 'StackProxy', GridController]);

    function GridController($scope, $interval, $window, notifier, context, proxy) {
        $scope.feedOn = false;
        $scope.updateIntervalMins = 2; 
        $scope.lastUpdateDate = null;
        $scope.questions = [];
        $scope.tags = {};
        $scope.tagOptions = {
            placeholder: 'Type to search or select from the dropdown'
            //look on website for more options
        };
        $scope.parameters = {};

        $scope.openQuestion = function (question) {
            context.addViewedQuestion(question.question_id);
            $window.open(question.link, '_blank');
        };

        $scope.questionPreviouslyViewed = function (questionId) {
            return _.contains(context.getViewedQuestions(), questionId);
        };

        $scope.initializeFeed = function () {
            $scope.feedOn = true;
            loadQuestions();
        };

        $scope.updateFeed = function () {
            $scope.feedOn = true;
            loadQuestions();
        };

        $scope.search = function () {
            $scope.feedOn = false;
            loadQuestions();
        };

        $scope.turnFeedOn = function () {
            $scope.feedOn = true;
        };

        $scope.turnFeedOff = function () {
            $scope.feedOn = false;
        };

        $scope.reloadQuestions = function () {
            loadQuestions();
        };

        loadTags('stackoverflow', 1, 100);

        function loadQuestions() {
            proxy.getQuestions($scope.parameters)
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

        function loadTags(site, page, pageSize) {
            proxy.getTags(site, page, pageSize) 
                .then(function (data) {
                    if (!$scope.tags[site]) {
                        $scope.tags[site] = [];
                    }
                    angular.forEach(data.items, function (value, key) {
                        $scope.tags[site].push(value);
                    });
                }), function (reason) {
                    notifier.error('Failed: ' + reason);
                };
        }
    }
})();