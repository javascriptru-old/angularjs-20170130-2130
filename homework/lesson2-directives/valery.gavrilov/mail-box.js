//template and script for mailbox component 

//const m = angular.module('hw2');
m.component('mailBox', {
    template: `

    {{$ctrl.mailItems}}
        <h3>Mail Inbox</h3>
	<table>
	<tr ng-repeat='item in $ctrl.mailItems | criterion : $ctrl.searchText' >
	<td>
		<mail-item item='item'></mail-item>
	</td>	
	</tr>
	</table>

	<div>
	<b>Search by</b>
	<input type='text' ng-model='$ctrl.searchText'></input>
	{{$ctrl.searchText}}
	</div>
    
            `
    , controller: function(){
        this.mailItems = [
			{from: 'aaa', receivedOn: '02/01/2017 10:59'},  
			{from: 'vvv', receivedOn: '01/01/2017 12:17'},
			{from: 'ttt', receivedOn: '02/24/2017 01:00'}];

        this.isMatching = function(from, searchText){
		    return (!searchText) ||  from.indexOf(searchText) != -1;
		}
		
    }
});

