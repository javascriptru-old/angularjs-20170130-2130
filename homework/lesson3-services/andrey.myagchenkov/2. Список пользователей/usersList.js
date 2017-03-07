let app = angular.module('usersList', []);

app.service('loadUsers', function ($http) {
	let url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';

	this.users = () => { return $http.get(url) };
});

app.component('usersList', {
	templateUrl: 'template.html',
	controller: function(loadUsers) {
		loadUsers.users().then(users => this.users = users.data);
	}
});