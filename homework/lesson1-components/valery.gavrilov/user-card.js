let m = angular.module('hw1');

m.component('userCard', {
    template: `
    <div ng-class='$ctrl.highlight ? "highlight" : ""' ng-click='$ctrl.highlight=!$ctrl.highlight'><h1>haha</h1>
    {{$ctrl.profile.firstName}}
    {{$ctrl.profile.lastName}}
    [{{$ctrl.idx}}]
    
    </div>

    <span ng-click='$ctrl.doDelete({i: $ctrl.idx})'>
    X
    </span>
    
    `
    , controller: function(){
        this.highlight = false;
        
    },
    bindings: {
        profile: '<user',
        idx: '<idx',
        doDelete: '&deleteAction'
    }
});
