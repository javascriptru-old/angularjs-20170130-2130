app.component('userCard', {
    templateUrl: 'user-card.component.html',
    bindings: {
        user: '<',
        index: '<',
        callbackDelete: '&delete'
    },
    controller: function($http) {
        this.users = []
        this.deleteUser = ($event, index) => {
            $event.stopPropagation()
            this.callbackDelete({index})
        }
        $http.get('users.json').then((response) => {
            this.users = response.data
        });
    }
});