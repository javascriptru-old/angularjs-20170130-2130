import rootTmp from './rootApp.html'
class rootCtrl {
    $onInit() {
      this.allUsers = JSON.parse('[{"firstName":"Катерина","surname":"Латухина","photo":"http://i.imgur.com/vN6pxep.jpg","country":"ru"},{"firstName":"Максим","surname":"Иванов","photo":"http://i.imgur.com/duePtdB.jpg","country":"ru"},{"firstName":"Егор","surname":"Литвяков","photo":"http://i.imgur.com/Re2rrye.jpg","country":"ru"},{"firstName":"Елена","surname":"Ярмушева","photo":"http://i.imgur.com/7ioi0My.jpg","country":"ua"},{"firstName":"Aibulat","surname":"Nigmatullin","country":"ru"},{"firstName":"Максим","surname":"Марина","photo":"http://i.imgur.com/JSEvJwf.jpg","country":"ru"},{"firstName":"Федор","surname":"Дыдыкин","photo":"http://i.imgur.com/VjqYamq.jpg","country":"ru"},{"firstName":"Андрей","surname":"Мягченков","country":"ru"},{"firstName":"Николай","surname":"Байбородин","photo":"http://i.imgur.com/vvzLtVG.jpg","country":"ru"},{"firstName":"Дмитрий","surname":"Марков","photo":"http://i.imgur.com/MOHWnlL.png","country":"ru"},{"firstName":"Юрий","surname":"Масьян","country":"ru"},{"firstName":"Тимур","surname":"Турчанинов","country":"ru"},{"firstName":"Треско","surname":"Константин","country":"ru"},{"firstName":"Вася","surname":"Пупкин","country":"ru"},{"firstName":"Андрей","surname":"Сызранов","photo":"http://i.imgur.com/IWSqtSO.jpg","country":"ru"},{"firstName":"Климент","surname":"Рудниченко","country":"ru"},{"firstName":"Larissa","surname":"Smirnova","country":"ca"},{"firstName":"Valery","surname":"Gavrilov","country":"ru"},{"firstName":"Людмила","surname":"Куприянова","country":"ru"},{"firstName":"Данила","surname":"Бурдин","country":"ru"},{"firstName":"Александр","surname":"Джанашвили","photo":"http://i.imgur.com/pGlRYJH.jpg","country":"ru"}]');
      this.removeItem = function (user) {
        this.allUsers = this.allUsers.filter(item => item !== user)
      }
      this.selected = null;
    }
}
const rootApp = {
  //templateUrl:rootTmp,
  template: require('./rootApp.html'),
  controller: rootCtrl
}
export default rootApp
