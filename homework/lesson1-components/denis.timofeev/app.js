angular.module('contactsList', [])
    .component('appRoot', {
        templateUrl: 'app-root.template.html',
        controller: function () {
            this.contactsList = [{"firstName":"Катерина","surname":"Латухина","photo":"http://i.imgur.com/vN6pxep.jpg","country":"ru"},{"firstName":"Максим","surname":"Иванов","photo":"http://i.imgur.com/duePtdB.jpg","country":"ru"},{"firstName":"Егор","surname":"Литвяков","photo":"http://i.imgur.com/Re2rrye.jpg","country":"ru"},{"firstName":"Елена","surname":"Ярмушева","photo":"http://i.imgur.com/7ioi0My.jpg","country":"ua"},{"firstName":"Aibulat","surname":"Nigmatullin","country":"ru"},{"firstName":"Максим","surname":"Марина","photo":"http://i.imgur.com/JSEvJwf.jpg","country":"ru"},{"firstName":"Федор","surname":"Дыдыкин","photo":"http://i.imgur.com/VjqYamq.jpg","country":"ru"},{"firstName":"Андрей","surname":"Мягченков","country":"ru"},{"firstName":"Николай","surname":"Байбородин","photo":"http://i.imgur.com/vvzLtVG.jpg","country":"ru"},{"firstName":"Дмитрий","surname":"Марков","photo":"http://i.imgur.com/MOHWnlL.png","country":"ru"},{"firstName":"Юрий","surname":"Масьян","country":"ru"},{"firstName":"Тимур","surname":"Турчанинов","country":"ru"},{"firstName":"Треско","surname":"Константин","country":"ru"},{"firstName":"Вася","surname":"Пупкин","country":"ru"},{"firstName":"Андрей","surname":"Сызранов","photo":"http://i.imgur.com/IWSqtSO.jpg","country":"ru"},{"firstName":"Климент","surname":"Рудниченко","country":"ru"},{"firstName":"Larissa","surname":"Smirnova","country":"ca"},{"firstName":"Valery","surname":"Gavrilov","country":"ru"},{"firstName":"Людмила","surname":"Куприянова","country":"ru"},{"firstName":"Данила","surname":"Бурдин","country":"ru"},{"firstName":"Александр","surname":"Джанашвили","photo":"http://i.imgur.com/pGlRYJH.jpg","country":"ru"}];
            this.delete = function (index) {
                this.contactsList.splice(index, 1);
                console.log(index);
            }
        }
    })
    .component('userCard', {
        templateUrl: 'user-card.template.html',
        controller: function () {
            this.active = false;
            this.toggleColor = function() {
                this.active = true;
            };
            this.getClass = function () {
                return this.active ? 'active' : '';
            };
        },
        bindings: {
            user: '='
        }
    })
;