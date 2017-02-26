angular.module('routeApp')
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .service('AuthInterceptor', LoginInterceptorService);


function LoginInterceptorService($location, userService) {

    this.response = (response) => {
        if (!userService.auth && $location.path() !== '/reg') {
            $location.path('/auth');
        }
        return response;
    };
}