import cardsTpl from './userCards.html'
class cardCtrl {
    $onInit() {
      this.onClick = function () {
          this.selected = this.user;
      }
    }
}
const userCards = {
    template:require('./userCards.html'),
    bindings: {
        user: '<',
        remove: '&',
        selected: '='
    },
    controller:cardCtrl
}
export default userCards
