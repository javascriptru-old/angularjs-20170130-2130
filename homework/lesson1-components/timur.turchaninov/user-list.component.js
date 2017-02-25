app.component('userList', {
    templateUrl: 'user-list.component.html',
    bindings: {
        user: '<',
        index: '<'
    },
    controller: function($http) {
        this.users = []
        this.deleteUserCard = (index) => {
            this.users.splice(index, 1)
        }
        $http.get('users.json').then((response) => {
            this.users = response.data
    });
    }
});