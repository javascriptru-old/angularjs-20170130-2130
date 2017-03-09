1. Вопросы производительности AngularJs +


2. Переход на Angular2 +
3. Какой style guide использовать +
4. Способы синхронизации приложения работающего в разных вкладках

    app  <--СОКЕТЫ-->  app
	$scope.$apply();

5. Angular и TypeScript хотя бы в общих чертах +
7. Сервис промисов $q.

     --> Promise (EcmaSCript 2015) - https://learn.javascript.ru/promise

+ WebPack для сборки. ngAnnotate
+ Собираем тесты с помощью webpack
+ Проверяем покрытие кода тестами


- Функциональные(e2e) тесты с использованием protractor. +

<div ng-bind="userName"></div>
<div>{{userName}}</div>



6. События ng-events на $scope. Как навешивать эти события и обрабатьвать их в контролере компонента?

$scope.emit/$scope.broadcast
$scope.on




> Сторонние плагины, не знающие про AngularJS

- логику (Service)
- UI (directive)
Angular < - > jQuery

Angular --> jQuery =>  $watch('ngProperty', callback => jQuery);
jQuery --> Angular =>  $apply();


Что делать если не Ангуляр?
1) Может есть решение на Ангуляре?
2) Может есть обертка на Ангуляре?
3) Писать свою синхронизацию





