app.component('userList', {
	templateUrl: 'components/user-list.tpl.html',
	controller: function($http){

		this.users = []

		this.activeUser = null

		this.setActiveUser = (index) => {
			this.activeUser = index
		}

		this.detachUser = (index) => {
			this.users.splice(index, 1)
			this.activeUser = null
		}
		
		$http.get('data/users.json').then((response) => {
			this.users = response.data
		});
	}
});