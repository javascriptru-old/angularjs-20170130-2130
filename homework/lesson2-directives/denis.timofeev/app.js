angular.module('contactsList', [])
    .component('mailBox', {
        templateUrl: 'mail-box.template.html',
        controller: function () {
            this.mail = [
                {"date": new Date(2017, 0, 2), "from": "robert@gmail.com", "text": "Robert's mail. Some text for Angular"},
                {"date": new Date(2016, 11, 15), "from": "john@gmail.com", "text": "John's mail. Some text for Robert"},
                {"date": new Date(2017, 1, 0), "from": "kate@gmail.com", "text": "Kate's mail. Some text for John"},
                {"date": new Date(2017, 1, 6, 18, 5, 17), "from": "Olga@gmail.com", "text": "Olga's mail. Some text for Kate"},
                {"date": new Date(2017, 1, 7, 16, 3, 14), "from": "angular@gmail.com", "text": "Angular's mail. Some text for Olga"}
            ];
            this.deleteUser = function (index) {
                this.mail.splice(index, 1);
            }
        }
    })
    .component('mailItem', {
        templateUrl: 'mail-item.template.html',
        controller: function () {
            this.active = false;
            this.toggleColor = function() {
                this.active = !this.active;
            };
            this.getClass = function () {
                return this.active ? 'active' : '';
            };
            this.delete = function () {
                this.deleteFunc();
            }
        },
        bindings: {
            item: '=',
            deleteFunc: '&deleteUser'
        }
    })
    .filter('dateDecorator', function() {
        return function(dateParam) {
            return "**" + dateParam + "**";
        }
    })
    .filter('searchFilterFunc', function () {
        return function(dataArray, expected) {
            return dataArray.filter(function(value) {
                return expected == undefined || value.text.indexOf(expected) >= 0;
            });
        }
    })
;