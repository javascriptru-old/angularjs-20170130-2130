describe('myApp', () => {
  beforeEach(module('myApp'));

  describe('CalcService', () => {

      it('should do the sum', inject((Calc) => {
         expect(Calc.sum(3,4)).toBe(7);
      }));

  });

  describe('MainController', () => {

      let controller, Calc = { sum : angular.noop };

      beforeEach(inject(($controller) => {
        spyOn(Calc, 'sum').and.returnValue(7);
        controller = $controller('MainController', { Calc: Calc});
      }));

      it('should call Calc', () => {
         controller.doCalculations(3,4);
         expect(Calc.sum).toHaveBeenCalled();
      });

      it('should output result', () => {
         controller.doCalculations(3,4);
         expect(controller.result).toBe(7);
      });
  });

  describe('UserService', () => {
    let UserService, $httpBackend,
    mockUsers = [{ name: 'John'}];

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

  })
})