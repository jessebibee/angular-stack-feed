!function(){"use strict";var a=angular.module("app",["ngSanitize","ui.bootstrap","ui.select2"]);a.constant("APIKey","fFGxJHjVNmw4u*YZqKNLlw(("),toastr.options.timeOut=4e3,toastr.options.positionClass="toast-bottom-right"}();
!function(a){"use strict";function b(a,b,c,d,e){function f(){a.noQueryInput=a.parameters.query||a.parameters.includedTags.length?!1:!0}function g(b){e.getQuestions(a.parameters).then(function(d){var e=h(d.items);a.questions=d.items,e>0?c.info("Loaded "+e+" new questions"):0===e&&b?c.info("No new questions loaded"):0===e&&c.warning("0 questions found")},function(a){c.error("Failed: "+a)})}function h(b){for(var c=[],d=[],e=0;e<a.questions.length;e++)c.push(a.questions[e].question_id);for(var f=0;f<b.length;f++)d.push(b[f].question_id);return _.difference(d,c).length}function i(b,d,f){e.getTags(b,d,f).then(function(c){a.tags[b]||(a.tags[b]=[]),angular.forEach(c.items,function(c){a.tags[b].push(c)})},function(a){c.error("Failed: "+a)})}a.feedOn=!1,a.initialized=!1,a.noQueryInput=!1,a.updateIntervalMins=2,a.questions=[],a.tags={},a.tagOptions={placeholder:"Type to search or select from the dropdown"},a.parameters={sort:"creation",sortOrder:"desc"},a.openQuestion=function(a){d.addViewedQuestion(a.question_id),b.open(a.link,"_blank")},a.questionPreviouslyViewed=function(a){return _.contains(d.getViewedQuestions(),a)},a.initializeFeed=function(){f(),a.parametersForm.$valid&&!a.noQueryInput&&(a.feedOn=!0,a.initialized=!0,g())},a.updateFeed=function(){f(),a.parametersForm.$valid&&!a.noQueryInput&&(a.feedOn=!0,a.$broadcast("timer-restart"),g(!0))},a.search=function(){a.feedOn=!1,a.initialized=!0,g()},a.reloadQuestions=function(){g(!0)},i("stackoverflow",1,100)}var c="GridController";a.controller(c,["$scope","$window","notifier","dataContext","stackProxy",b])}(angular.module("app"));
!function(a){"use strict";function b(a,b){a.hasQuota=function(){return null!==b.quotaRemaining},a.getRemainingQuota=function(){return b.quotaRemaining}}var c="HeaderController";a.controller(c,["$scope","identity",b])}(angular.module("app"));
!function(a){"use strict";a.directive("countdownTimer",["$interval",function(a){function b(b,c){function d(){f(),a.cancel(g),g=a(e,1e3,1e3*b.startSeconds,!1)}function e(){h--,0===h&&b.autoRestart===!0&&(b.countdownExpired(),d(),h=b.startSeconds,f()),f()}function f(){var a=Math.floor(h/60),b=h-60*a;10>a&&(a="0"+a),10>b&&(b="0"+b),c.text(a+":"+b)}var g,h=b.startSeconds;b.$watch("on",function(c){c===!0?d():(a.cancel(g),h=b.startSeconds)}),b.$watch("startSeconds",function(a){h=a,b.on===!0&&d()}),b.$on("timer-restart",function(){a.cancel(g),g=a(e,1e3,1e3*b.startSeconds,!1),h=b.startSeconds,f()})}return{restrict:"EA",scope:{on:"=",startSeconds:"=",autoRestart:"=",countdownExpired:"&"},link:b}}])}(angular.module("app"));
!function(a){"use strict";a.filter("tag",["$filter",function(a){return function(b){return b.name+" "+a("number")(b.count)}}])}(angular.module("app"));
!function(a){"use strict";function b(){var a=[],b=function(){return a},c=function(b){a.push(b)};return{getViewedQuestions:b,addViewedQuestion:c}}var c="dataContext";a.factory(c,b)}(angular.module("app"));
!function(a){"use strict";function b(){return{quotaRemaining:null,authenticated:!1}}var c="identity";a.factory(c,["$q","$http",b])}(angular.module("app"));
!function(a){"use strict";function b(){function a(a){toastr.error(a)}function b(a){toastr.info(a)}function c(a){toastr.success(a)}function d(a){toastr.warning(a)}var e={error:a,info:b,success:c,warning:d};return e}a.factory("notifier",b)}(angular.module("app"));
!function(a){"use strict";function b(a,b,c,d){function e(a){a&&a.hasOwnProperty("quota_remaining")&&(c.quotaRemaining=a.quota_remaining)}function f(a){var b="";return a.sort&&(b=b+"&sort="+a.sort),a.sortOrder&&(b=b+"&order="+a.sortOrder),a.query&&(b=b+"&intitle="+a.query),a.includedTags&&a.includedTags.length>0&&(b=b+"&tagged="+a.includedTags.join(";")),a.excludedTags&&a.excludedTags.length>0&&(b=b+"&nottagged="+a.excludedTags.join(";")),b}var g="http://api.stackexchange.com/2.2",h=function(c){var h=a.defer();return b.get(g+"/search?key="+d+"&page=1&pageSize=100&site=stackoverflow"+f(c)).success(function(a){e(a),h.resolve(a)}).error(function(a){e(a),h.reject(a)}),h.promise},i=function(c,f,h){var i=a.defer();return b.get(g+"/tags?key="+d+"&page="+f+"&pageSize="+h+"&order=desc&sort=popular&site="+c).success(function(a){e(a),i.resolve(a)}).error(function(a){e(a),i.reject(a)}),i.promise};return{getQuestions:h,getTags:i}}var c="stackProxy";a.factory(c,["$q","$http","identity","APIKey",b])}(angular.module("app"));