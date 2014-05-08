(function () {
    'use strict';

    describe('Grid', function () {
        var ctrl, $scope, $window, dataContext;

        beforeEach(module('app'));

        beforeEach(function () {
            dataContext = {
                getViewedQuestions: sinon.stub().returns([2, 4, 6]),
                addViewedQuestion: sinon.spy()
            };

            $window = {
                open: sinon.spy()
            };

            module(function ($provide) {
                $provide.value('dataContext', dataContext);
                $provide.value('$window', $window);
            });


            inject(function ($controller, $rootScope) {
                $scope = $rootScope.$new();

                ctrl = $controller('GridController', {
                    $scope: $scope,
                    $window: $window,
                    dataContext: dataContext
                });
            });
        });

        it('should show previously viewed questions', inject(function () {
            expect($scope.questionPreviouslyViewed(4)).toBe(true);
            expect($scope.questionPreviouslyViewed(3)).toBe(false);
        }));

        it('should save question as viewed when question is opened', inject(function () {
            var question = { question_id: 250, link: 'test.html' };
            $scope.openQuestion(question);
            expect(dataContext.addViewedQuestion.calledOnce).toBe(true);
            expect(dataContext.addViewedQuestion.calledWith(250)).toBe(true);
        }));

        it('should open questions in a new window', inject(function () {
            var question = { question_id: 250, link: 'test.html' };
            $scope.openQuestion(question);
            expect($window.open.calledOnce).toBe(true);
            expect($window.open.calledWith('test.html', '_blank')).toBe(true);
        }));
    });
})();