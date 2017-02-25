class UsersService {
    constructor($http) {
        this.$http = $http;
    }

    getUsers() {
        let url = '(https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';
        return this.$http.get(url).then(
            response => response = response,
            error => error = error
        );
    }
}

export default UsersService;