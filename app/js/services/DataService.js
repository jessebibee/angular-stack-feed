(function () {
    'use strict';

    var serviceId = 'DataService';
    app.factory(serviceId, ['$q', '$http', 'IdentityService', DataService]);

    function DataService($q, $http, identity) {
        //TODO - Refactor updateQuota to an http interceptor?

        var rootUri = 'http://api.stackexchange.com/2.2/';

        var getQuestions = function (tag) {
            var deferred = $q.defer();
            $http.get(rootUri + 'questions?order=desc&sort=creation&tagged=' + tag + '&site=stackoverflow')
                .success(function (data, status, headers, config) {
                    updateQuota(data);
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    updateQuota(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        var getTags = function () {
            var deferred = $q.defer();
            $http.get(rootUri + 'tags?order=desc&sort=popular&site=stackoverflow')
                .success(function (data, status, headers, config) {
                    updateQuota(data);
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    updateQuota(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function updateQuota(data) {
            if (data && data.hasOwnProperty('quota_remaining')) {
                identity.quotaRemaining = data.quota_remaining;
            }
        }

        return {
            getQuestions: getQuestions,
            getTags: getTags
        }
    }
})();