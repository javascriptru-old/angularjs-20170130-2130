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
            this.deleteMail = function (index) {
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
                this.deleteItem();
            };
            this.$onDestroy = function() {
                var lifeTime = (new Date() - this.item.date);
                let years = moment.duration(lifeTime).years();
                let months = moment.duration(lifeTime).months();
                let days = moment.duration(lifeTime).days();
                let hours = moment.duration(lifeTime).hours();
                let minutes = moment.duration(lifeTime).minutes();
                let seconds = moment.duration(lifeTime).seconds();

                console.log('Письмо прожило ' + years + ' лет ' + months + ' мес. ' + days + ' дней ' + hours + ' часов ' + minutes + ' минут ' + seconds + ' секунд');
            }
        },
        bindings: {
            item: '=',
            deleteItem: '&'
        }
    })
    .filter('dateDecorator', function() {
        return function(dateParam) {

            var lifeTime = (new Date() - dateParam);
            let years = moment.duration(lifeTime).years();
            let months = moment.duration(lifeTime).months();
            let days = moment.duration(lifeTime).days();
            let hours = moment.duration(lifeTime).hours();
            let minutes = moment.duration(lifeTime).minutes();
            let seconds = moment.duration(lifeTime).seconds();

            let retVal = "";
            if (years > 0) {
                retVal += years + ' лет ';
            }
            if (months > 0) {
                retVal += months + ' месяцев ';
            }
            if (days > 0) {
                retVal += days + ' дней ';
            }
            if (hours > 0) {
                retVal += hours + ' часов ';
            }
            if (minutes > 0) {
                retVal += minutes + ' минут ';
            }
            if (seconds > 0) {
                retVal += seconds + ' секунд ';
            }
            return retVal + ' назад';
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