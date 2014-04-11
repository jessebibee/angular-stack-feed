﻿(function () {
    'use strict';

    var serviceId = 'StackProxy';
    app.factory(serviceId, ['$q', '$http', 'Identity', StackProxy]);

    function StackProxy($q, $http, identity) {
        //TODO - Refactor updateQuota to an http interceptor?

        var rootUri = 'http://api.stackexchange.com/2.2';

        var getQuestions = function (filters) {
            var deferred = $q.defer();
            $http.get(rootUri + '/search/advanced?key=fFGxJHjVNmw4u*YZqKNLlw((&order=desc&sort=creation&tagged=' + filters[0].includedTags.join(';') + '&site=stackoverflow')
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
            $http.get(rootUri + '/tags?key=fFGxJHjVNmw4u*YZqKNLlw((&order=desc&sort=popular&site=stackoverflow')
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