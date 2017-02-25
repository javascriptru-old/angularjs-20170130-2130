angular.module('routeApp')
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .service('AuthInterceptor', LoginInterceptorService);


function LoginInterceptorService($location, authService) {

    this.response = (response) => {
        if (!authService.getAuth()) {
            $location.path('/auth');
        }
        return response;
    };
}