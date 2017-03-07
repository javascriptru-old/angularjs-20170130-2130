describe('myApp', () => {
  beforeEach(module('myApp'));



  describe('CalcService', () => {

    it('should do the sum', inject((Calc) => {
      expect(Calc.sum(3, 4)).toBe(7);
    }));

  });

  describe('MainController', () => {

    let controller, Calc = { sum: angular.noop };

    beforeEach(inject(($controller) => {
      spyOn(Calc, 'sum').and.returnValue(7);
      controller = $controller('MainController', { Calc: Calc });
    }));

    it('should call Calc', () => {
      controller.doCalculations(3, 4);
      expect(Calc.sum).toHaveBeenCalled();
    });

    it('should output result', () => {
      controller.doCalculations(3, 4);
      expect(controller.result).toBe(7);
    });
  });

  describe('UserService', () => {
    let UserService, $httpBackend,
      mockUsers = [{ name: 'John' }];

    beforeEach(inject((_UserService_, _$httpBackend_) => {
      UserService = _UserService_;
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET('/users/1').respond(mockUsers[0])
      $httpBackend.whenGET('/users').respond(mockUsers);
    }));

    it('should get one user', (done) => {
      UserService.getOne(1).then((user) => {
        expect(user).toEqual(mockUsers[0]);
        done();
      });
      $httpBackend.flush();
    });

  });

  describe('UserCardDirective', () => {
    let UserService,
      element, $scope, isolatedScope,
      mockUser = { name: 'Job'},
      deferred;

    beforeEach(inject(($q, $compile, $rootScope, _UserService_) => {
      UserService = _UserService_;
      spyOn(UserService, 'getOne').and.returnValue($q.resolve(mockUser))
      $scope = $rootScope.$new();
      $scope.user = { name: 'Bob'} ;
      element = angular.element('<user-card user="user"></user-card>');
      $compile(element)($scope);
      $scope.$digest();
      isolatedScope = element.isolateScope();
    }));

    it('should call UserService', inject((UserService) => {
      isolatedScope.someMethod();
      expect(UserService.getOne).toHaveBeenCalled();
    }));

    it('should set user', (done) => {
      isolatedScope.someMethod().then(() => {
        expect(isolatedScope.user).toEqual(mockUser);
        done();
      });
      $scope.$digest();
    });

  })

  describe('UserProfileComponent', () => {
    let $componentController, user = { name: 'Job'}, UserService;

    beforeEach(inject(($q, _$componentController_, _UserService_) => {
      $componentController = _$componentController_;
      UserService = _UserService_;
      spyOn(UserService, 'getOne').and.returnValue($q.resolve({ user : user }));
    }));

    it('should call UserService', () => {
      componentController = $componentController('userProfile', null, { user : user });
      componentController.someMethod();
      expect(UserService.getOne).toHaveBeenCalled();
    });

    it('should set user', () => {
      componentController = $componentController('userProfile', null, { user : user });
      componentController.someMethod();
      expect(componentController.user).toEqual({ name: 'Job' });
    });
  });

})