(function () {
    'use strict';

    app.directive('countdownTimer', ['$interval', function ($interval) {
        return {
            restrict: 'EA',
            scope: {
                on: '=',
                seconds: '=',
                restart: '=',
                countdownExpired: '&'
            },
            link: link
        };

        function link($scope, $element, $attrs, $ctrl) {
            var interval;
            var clockSeconds = $scope.seconds; //needs to be primitive typeof number

            $scope.$watch('on', function (newValue) {
                if (newValue === true) {
                    initInterval();
                }
                else {
                    $interval.cancel(interval);
                    clockSeconds = $scope.seconds;
                }
            });

            $scope.$watch('seconds', function (newValue) {
                clockSeconds = newValue;
                if ($scope.on === true) {
                    initInterval();
                }
            });

            function initInterval() {
                setClockText();
                $interval.cancel(interval);
                interval = $interval(tick, 1000, $scope.seconds * 1000, false);
            }
            
            function tick() {
                clockSeconds--;
                if (clockSeconds === 0 && $scope.restart === true) {
                    $scope.countdownExpired();
                    initInterval();
                    clockSeconds = $scope.seconds;
                    setClockText();
                }
                setClockText();
            }

            //TODO - refactor to filter
            function setClockText() {
                var minutes = Math.floor(clockSeconds / 60);
                var seconds = clockSeconds - (minutes * 60);
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
})();