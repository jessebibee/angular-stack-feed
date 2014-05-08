(function () {
    'use strict';

    describe('Grid', function () {
        var ctrl, $scope, contextMock;

        beforeEach(module('app'));

        beforeEach(function () {
            //Option 1
            //contextMock = jasmine.createSpyObj('context', ['getViewedQuestions']);
            //Option 2
            contextMock = {
                getViewedQuestions: function () {
                    return [2, 4, 6];
                }
            };

            module(function ($provide) {
                $provide.value('DataContext', contextMock);
            });


            inject(function ($controller, $rootScope) {
                $scope = $rootScope.$new();
                //contextMock.getViewedQuestions.andReturn([2, 4, 6]);


                ctrl = $controller('GridController', {
                    $scope: $scope,
                    context: contextMock
                });
            });
        });

        it('should show previously viewed questions', inject(function () {
            expect($scope.questionPreviouslyViewed(4)).toBe(true);
            expect($scope.questionPreviouslyViewed(3)).toBe(false);
        }));
    });
})();