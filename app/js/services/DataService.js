'use strict';

app.factory('DataService', ['$q', '$http', function ($q, $http) {

    var questionsUri = 'http://api.stackexchange.com/2.2/questions';

    var getQuestions = function (tag) {
        var deferred = $q.defer();
        $http.get(questionsUri + '?order=desc&sort=creation&tagged=' + tag + '&site=stackoverflow').
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    return {
        getQuestions: getQuestions
    }
}]);