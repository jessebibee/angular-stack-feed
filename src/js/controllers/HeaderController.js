(function () {
    'use strict';

    var controllerId = 'HeaderController';
    app.controller(controllerId, ['$scope', 'Identity', HeaderController]);

    function HeaderController($scope, identity) {
        //$scope.test = 'Signed in as Mark Otto';
        //$scope.authenticated = identity.authenticated;
        //$scope.quotaRemaining = identity.quotaRemaining;

        $scope.hasQuota = function () {
            return identity.quotaRemaining != null;
        };

        $scope.getRemainingQuota = function () {
            return identity.quotaRemaining;
        };

        //$scope.signIn = function () {
        //    SE.authenticate({
        //        success: function(data) { console.log('Authentication success', data) },
        //        error: function (data) { console.log('Authentication error', data) },
        //        //scope: ['read_inbox'],
        //        networkUsers: true //optional
        //    });
        //};
    }
})();