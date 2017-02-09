const app = angular.module('app', []);


// mailbox component
app.component('mailBox', {
	template:
	`
		<div class="center-block">
			<input ng-model="filterByInput">
			<button ng-if="$ctrl.emailCollection.length" ng-click="$ctrl.detachEemailCollection()">{{ $ctrl.buttonText() }}</button>
		</div>
		<div class="center-block">
		<e-mail ng-repeat="item in $ctrl.mailBoxData | filter: filterByInput" email="item" detach-email="$ctrl.detachEmail(id)" collect-emails="$ctrl.collectEmails(id)"></e-mail>
		</div>
	`,
	controller: function($filter){

		this.mailBoxData = mailBoxData

		this.emailCollection = []

		this.collectEmails = (id) => {

			if( this.emailCollection.indexOf(id) >= 0 ) {
				this.emailCollection.splice( this.emailCollection.indexOf(id), 1);
			} else {
				this.emailCollection.push(id);
			}
		}

		// single deletion
		this.detachEmail = (id) => {

			let item = this.find(id)

			this.mailBoxData.splice( item, 1);

			if( this.emailCollection.indexOf(id) >= 0 ) {
				this.emailCollection.splice( this.emailCollection.indexOf(id), 1);
			}
		}

		// multiple deletion
		this.detachEemailCollection = () => {

			this.emailCollection.sort().forEach((item, i) => {
				this.mailBoxData.splice( this.find(item), 1)
			});

			this.emailCollection = []
		}

		// returns deletion button text
		this.buttonText = () => {
			let emailCollectionCount = this.emailCollection.length
			return `Удалить ${emailCollectionCount} ${ $filter('myDeclensionFilter')(emailCollectionCount, ['письмо', 'письма', 'писем'])}`
		}

		// returns index of email
		this.find = (id) => {
			let test = null
			this.mailBoxData.forEach((item, i) => {
				if( item.id == id )
					test = i
					return false
			});
			return test
		}
	}
});


// mail component
app.component('eMail', {
	template:
	`
		<div class="email-item">
			<label><input type="checkbox" ng-click="$ctrl.collectEmails({ id: $ctrl.email.id })"></label>
			<div>{{ $ctrl.email.author }}</div>
			<div>{{ $ctrl.email.message | myTruncateFilter : 50 }}</div>
			<div>{{ $ctrl.calculatedTime | myDateFilter }}</div>
			<button ng-click="$ctrl.detachEmail({ id: $ctrl.email.id })" class="email-item__detach">&times;</button>
		</div>
	`,
	bindings: {
		email: '<',
		collectEmails: '&',
		detachEmail: '&'
	},
	controller: function($interval, $filter){

		let interval = null

		this.$onInit = () => {

			this.calculatedTime = this.email.created

			interval = $interval(() => {
				this.calculatedTime = moment().milliseconds() + this.calculatedTime
			}, 1000)
		}


		this.$onDestroy = () => {

			$interval.cancel( interval );

			let now 		= moment();
			let timePassed 	= moment.duration( now - this.calculatedTime )

			let seconds 	= timePassed.seconds()
			let minutes 	= timePassed.minutes()
			let days 		= timePassed.days()
			let months 		= timePassed.months()
			let years 		= timePassed.years()

			console.group('Время жизни письма:')

			console.log('%s %s', years, 	$filter('myDeclensionFilter')(years, ['год', 'года', 'лет']))
			console.log('%s %s', months, 	$filter('myDeclensionFilter')(months, ['месяц', 'месяца', 'месяцев']))
			console.log('%s %s', days, 		$filter('myDeclensionFilter')(days, ['день', 'дня', 'дней']))
			console.log('%s %s', minutes, 	$filter('myDeclensionFilter')(minutes, ['минута', 'минуты', 'минут']))
			console.log('%s %s', seconds, 	$filter('myDeclensionFilter')(seconds, ['секунда', 'секунды', 'секунд']))

			console.groupEnd()
		}


	}
});

app.filter('myTruncateFilter', function(){
	return function( string, maxLength ){
		maxLength = maxLength || 100
		return (string.length > maxLength) ? string.substr(0, maxLength - 1).trim() + '…' : string;
	}
});

app.filter('myDateFilter', function() {
	return function( timeStamp ){
		return moment( timeStamp ).fromNow();
	}
});

app.filter('myDeclensionFilter', function(){
	return function(number, titles){
		let cases = [2, 0, 1, 1, 1, 2];  
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]; 
	}
});





const mailBoxData = 
	[
		{
			id: 98,
			author: 'William Mayer',
			message: ' Sint excepteur ut incididunt velit consequat reprehenderit aliqua Lorem. Laborum aliquip excepteur in aute reprehenderit in. Consectetur nisi tempor et cupidatat occaecat.',
			created: 1486509210826
		},
		{
			id: 21312,
			author: 'Summer Kramer',
			message: 'Sint et cupidatat cillum proident commodo veniam amet eu non nisi occaecat velit. Duis dolore enim cupidatat nisi consequat. Sit eu elit labore do velit deserunt voluptate laboris aliqua dolor eu.',
			created: Date.now() - (Date.now()/1000)
		},
		{
			id: 757,
			author: 'Debbie Galloway',
			message: 'Hello, Lillie! In dolore culpa voluptate pariatur ipsum sit ullamco magna nostrud. Pariatur deserunt dolore amet exercitation. Ad dolore velit nisi occaecat sint id labore labore culpa aute aute duis. Aliqua proident fugiat Lorem amet eu qui Lorem in non anim culpa consequat.',
			created: Date.now()
		},
		{
			id: 4545,
			author: 'Juarez Craig',
			message: 'Magna velit ipsum voluptate est ad ipsum adipisicing est incididunt. Minim officia sunt minim minim ea ea officia deserunt exercitation exercitation veniam ad ullamco consectetur. Est tempor voluptate dolor dolor ut reprehenderit culpa proident reprehenderit irure id. Excepteur cupidatat irure consectetur reprehenderit ea nostrud. Laboris pariatur tempor enim pariatur consequat fugiat exercitation.',
			created: 1486387359306.7573
		},
		{
			id: 4564,
			author: 'Lana Roach',
			message: 'Ea laborum anim reprehenderit eiusmod. Aliquip minim cillum dolore aliquip in et. Tempor ut et tempor velit enim fugiat proident velit cupidatat labore amet.',
			created: Date.now() - (Date.now()/500)
		},
		{
			id: 34234,
			author: 'Cabrera Guy',
			message: 'Commodo dolor pariatur sunt qui enim voluptate non. Enim pariatur labore irure duis eiusmod. Consequat elit exercitation ut amet elit sunt cillum occaecat. Sint excepteur ut incididunt velit consequat reprehenderit aliqua Lorem. Laborum aliquip excepteur in aute reprehenderit in. Consectetur nisi tempor et cupidatat occaecat.',
			created: Date.now() - (Date.now()/30)
		}
	]