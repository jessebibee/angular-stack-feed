(function () {
    'use strict';

    var serviceId = 'DataContext';
    app.factory(serviceId, DataContext);

    function DataContext() {
        var viewedQuestions = []; //holds questionId's that have been opened
        var tags = {}; //holds Stack Exchange tags

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
})();