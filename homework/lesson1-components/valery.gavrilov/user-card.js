let m = angular.module('hw1');

m.component('userCard', {
    template: `
    <div ng-class='$ctrl.highlight ? "highlight" : ""' ng-click='$ctrl.highlight=!$ctrl.highlight'><h1>haha</h1>
    {{$ctrl.profile.firstName}}
    {{$ctrl.profile.lastName}}
    [{{$ctrl.idx}}]
    </div>
    <span ng-click='$ctrl.delete($ctrl.idx)'>
    X
    </span>
    
    `
    , controller: function(){
        this.highlight = false;
        this.delete =idx=>{ alert(idx); return false;}
    },
    bindings: {
        profile: '<user',
        idx: '<idx'
    }
});
