(function (app) {
    'use strict';

    app.directive('countdownTimer', ['$interval', function ($interval) {
        return {
            restrict: 'EA',
            scope: {
                on: '=',
                startSeconds: '=',
                autoRestart: '=',
                countdownExpired: '&'
            },
            link: link
        };

        function link($scope, $element, $attrs, $ctrl) {
            var interval;
            var timerSeconds = $scope.startSeconds; //needs to be primitive typeof number

            $scope.$watch('on', function (newValue) {
                if (newValue === true) {
                    initInterval();
                }
                else {
                    $interval.cancel(interval);
                    timerSeconds = $scope.startSeconds;
                }
            });

            $scope.$watch('startSeconds', function (newValue) {
                timerSeconds = newValue;
                if ($scope.on === true) {
                    initInterval();
                }
            });

            $scope.$on('timer-restart', function () {
                $interval.cancel(interval);
                interval = $interval(tick, 1000, $scope.startSeconds * 1000, false);
                timerSeconds = $scope.startSeconds;
                setClockText();
            });

            function initInterval() {
                setClockText();
                $interval.cancel(interval);
                interval = $interval(tick, 1000, $scope.startSeconds * 1000, false);
            }

            function tick() {
                timerSeconds--;
                if (timerSeconds === 0 && $scope.autoRestart === true) {
                    $scope.countdownExpired();
                    initInterval();
                    timerSeconds = $scope.startSeconds;
                    setClockText();
                }
                setClockText();
            }

            function setClockText() {
                var minutes = Math.floor(timerSeconds / 60);
                var seconds = timerSeconds - (minutes * 60);
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                $element.text(minutes + ':' + seconds);
            }
        }
    }]);
})(angular.module('app'));