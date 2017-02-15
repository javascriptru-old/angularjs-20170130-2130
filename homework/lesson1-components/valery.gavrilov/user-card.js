let m = angular.module('hw1');

m.component('userCard', {
    template: `
    <div ng-class='$ctrl.highlight ? "highlight" : ""' ng-click='$ctrl.highlight=!$ctrl.highlight'>
    
    <h3>{{$ctrl.profile.firstName + ' ' + $ctrl.profile.lastName}}</h3>
    <table>
    <tbody>
    <tr>    <td>{{$ctrl.profile.dob}}</td> </tr>
    <tr>    <td>{{$ctrl.profile.sex}}</td></tr>
    <tr>    <td>{{$ctrl.profile.address}}</td></tr>
    <tr>    <td>{{$ctrl.profile.email}}</td></tr>

    </tbody>
    </table>
    <!--
    {{$ctrl.profile.lastName}}
    [{{$ctrl.idx}}]
    -->
    
    </div>

    <span ng-click='$ctrl.doDelete({i: $ctrl.idx})'>
    [X DELETE]
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
