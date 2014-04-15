(function () {
    'use strict';

    var serviceId = 'StackProxy';
    app.factory(serviceId, ['$q', '$http', 'Identity', 'APIKey', StackProxy]);

    function StackProxy($q, $http, identity, key) {
        //TODO - Refactor updateQuota to an http interceptor?

        var rootUri = 'http://api.stackexchange.com/2.2';

        var getQuestions = function (parameters) {
            var deferred = $q.defer();
            $http.get(rootUri + '/search?key=' + key + '&page=1&pageSize=100&site=stackoverflow' + buildSearchQuery(parameters))
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

        var getTags = function (site, page, pageSize) {
            var deferred = $q.defer();
            $http.get(rootUri + '/tags?key=' + key + '&page=' + page + '&pageSize=' + pageSize + '&order=desc&sort=popular&site=' + site)
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

        function buildSearchQuery(parameters) {
            var queryString = '';
            if (parameters.sort) {
                queryString = queryString + '&sort=' + parameters.sort;
            }
            if (parameters.sortOrder) {
                queryString = queryString + '&order=' + parameters.sortOrder;
            }
            if (parameters.query) {
                //use only if using search/advanced method otherwise the querystring param is q
                queryString = queryString + '&intitle=' + parameters.query;
            }
            if (parameters.includedTags && parameters.includedTags.length > 0) {
                queryString = queryString + '&tagged=' + parameters.includedTags.join(';');
            }
            if (parameters.excludedTags && parameters.excludedTags.length > 0) {
                queryString = queryString + '&nottagged=' + parameters.excludedTags.join(';');
            }
            return queryString;
        }

        return {
            getQuestions: getQuestions,
            getTags: getTags
        }
    }
})();