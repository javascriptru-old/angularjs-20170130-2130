app.component('userCard', {
	templateUrl: 'components/user-card.tpl.html',
	bindings: {
		user: '<',
		index: '<',
		setActiveUser: '&',
		detachUser: '&'
	}
});