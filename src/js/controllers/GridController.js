(function () {
    'use strict';

    var controllerId = 'GridController';
    app.controller(controllerId, ['$scope', '$window', 'notifier', 'dataContext', 'stackProxy', GridController]);

    function GridController($scope, $window, notifier, context, proxy) {
        $scope.feedOn = false;
        $scope.initialized = false;
        $scope.updateIntervalMins = 2;
        $scope.questions = [];
        $scope.tags = {};
        $scope.tagOptions = {
            placeholder: 'Type to search or select from the dropdown'
            //look on website for more options
        };
        $scope.parameters = {
            sort: 'creation',
            sortOrder: 'desc'
        };

        $scope.openQuestion = function (question) {
            context.addViewedQuestion(question.question_id);
            $window.open(question.link, '_blank');
        };

        $scope.questionPreviouslyViewed = function (questionId) {
            return _.contains(context.getViewedQuestions(), questionId);
        };

        $scope.initializeFeed = function () {
            $scope.feedOn = true;
            $scope.initialized = true;
            loadQuestions();
        };

        $scope.updateFeed = function () {
            $scope.feedOn = true;
            $scope.$broadcast('timer-restart');
            loadQuestions(true);
        };

        $scope.search = function () {
            $scope.feedOn = false;
            $scope.initialized = true;
            loadQuestions();
        };

        $scope.turnFeedOn = function () {
            $scope.feedOn = true;
        };

        $scope.turnFeedOff = function () {
            $scope.feedOn = false;
        };

        $scope.reloadQuestions = function () {
            loadQuestions(true);
        };

        loadTags('stackoverflow', 1, 100);

        function loadQuestions(reload) {
            proxy.getQuestions($scope.parameters)
                .then(function (data) {
                    var newQuestionsCount = getTotalNewQuestions(data.items);
                    $scope.questions = data.items;
                    if (newQuestionsCount > 0) {
                        notifier.info('Loaded ' + newQuestionsCount + ' new questions');
                    }
                    else if (newQuestionsCount === 0 && reload) {
                        notifier.info('No new questions loaded');
                    }
                    else if (newQuestionsCount === 0) {
                        notifier.warning('0 questions found');
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