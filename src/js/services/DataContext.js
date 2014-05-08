(function (app) {
    'use strict';

    var serviceId = 'dataContext';
    app.factory(serviceId, dataContext);

    function dataContext() {
        var viewedQuestions = []; //holds questionId's that have been opened

        var getViewedQuestions = function () {
            return viewedQuestions;
        };

        var addViewedQuestion = function (questionId) {
            viewedQuestions.push(questionId);
        };

        return {
            getViewedQuestions: getViewedQuestions,
            addViewedQuestion: addViewedQuestion
        };
    }
})(angular.module('app'));