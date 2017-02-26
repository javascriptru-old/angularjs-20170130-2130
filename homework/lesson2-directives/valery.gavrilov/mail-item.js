// template and script for mail item component 

// const m = angular.module('hw2');

m.component('mailItem', {
	template: `<td>{{$ctrl.letter.from}}</td>
		<td>{{$ctrl.letter.receivedOn | timePart}}</td>
		<td>{{$ctrl.letter.receivedOn | receivedAgo}}</td>

		
		`
		, controller: function($filter){
			this.$onInit = function(){
				console.log('init');
			};

			// need to remember the reference to filters:
			this.filters = $filter;

			this.$onDestroy = function(){
				console.log('destroy'); // will be called 3 times (for each item in ng-repeat)
				//debugger

				// inside a controller, data item is available as this.xxx

				var msg = this.filters('receivedAgo')(this.letter.receivedOn)
				console.log(msg);
			}
		}
		,bindings: {letter: '<item'}
		
});

