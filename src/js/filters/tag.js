﻿(function () {
    'use strict';

    app.filter('tag', ['$filter', function ($filter) {
        return function (tag) {
            return tag.name + ' ' + $filter('number')(tag.count);
        };
    }]);
})();