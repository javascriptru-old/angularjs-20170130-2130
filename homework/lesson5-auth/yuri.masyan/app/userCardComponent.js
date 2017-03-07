/**
 * Created by y.masyan on 20.02.2017.
 */
angular.module('app').component('userCardComponent', {
  // controller: function($http) {
  //   let data={data:{}};
  //   // this.card = data.data;
  //   this.card = {fullName:'fulma'};
  //   // let that = this;
  //   let that = {userId:''};
  //    that.userId = this.userId;
  //   console.log('this.userId');
  //   console.log(this.userId);
  //
  //
  //     let getData = function () {
  //       $http({
  //         method: 'GET',
  //         url: 'http://test-api.javascript.ru/v1/iliakan/users/'+that.userId
  //       }).then(function (response) {
  //         console.log('Данные получены2!');
  //         data.data = response.data;
  //       });
  //     };
  //     getData();
  //
  // },
  bindings: {
    // < - one way  !!! 1.5
    // = - two way
    // @ - value
    // & - callback
    card: '<',
    callbackSwitchoff: '&switchoff',
    callbackSwitchon: '&switchon'
  },
  template: `
88888888888
<div class="container">
  <div class="row">
    <div class="col-md-12">
<div class="panel panel-info"
     ng-click="userCardService.selected(card, $index)"
     tabindex="1">
    <div class="panel-heading">
        <h3 class="panel-title">{{$ctrl.card.fullName}}</h3>
        <button type="button" class="btn btn-default"
                ng-click="userCardService.delete(card, $index)">Удалить</button>
        <button type="button" class="btn btn-default"
                ui-sref="contacts">Все контакты</button>
            <!--<a ui-sref="Contacts">Страница контакта</a>-->

    </div>
    <div class="panel-body">
        <div class="row">
            <div class=" col-md-9 col-lg-9 ">
                <img ng-src="{{$ctrl.card.photo}}" alt="Нет фото" style="width:500px;">
                <table class="table table-user-information">
                    <tbody>
                    <tr><td>fullName:</td><td>{{$ctrl.card.fullName}}</td></tr>
                    <tr><td>email:</td><td>{{$ctrl.card.email}}</td></tr>
                    <tr><td>birthdate:</td><td>{{$ctrl.card.birthdate | date: 'dd.MM.yyyy'}}</td>                           
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="panel-footer">
    </div>
</div>

    </div>
  </div>
</div>
`,
});
