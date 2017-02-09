let app = angular.module('lesson2', []);

app.component('mailBox', {
    templateUrl: 'mail-box.tpl.html',
    controller: mailBoxController
});

app.filter('formatDateFilter', function () {
    return function formatDateFilter(date) {
        let currentDate = new Date();
        let timePassed = currentDate - date;

        if (timePassed < 1000) {
            return 'Just now';
        }

        let seconds = Math.floor(timePassed / 1000);
        if (seconds < 60) {
            return seconds + ' seconds ago';
        }

        let minutes = Math.floor(timePassed / 60000);
        if (minutes < 60) {
            return minutes + ' minutes ago';
        }

        let hours = Math.floor(timePassed / 3600000);
        if (hours < 24) {
            return hours + ' hours ago';
        }

        let days = Math.floor(timePassed / 86400000);
        if (days > 1) {
            return days + ' days ago';
        }

        return timePassed;
    };
});

app.filter('searchPatternFilter', function () {
    return function searchPatternFilter (letters, pattern) {
        pattern = pattern || null;
        return letters.filter(function (letter) {
            let pos = -1;
            let result = false;

            if (!pattern) {
                return true;
            }

            while ((pos = letter.title.indexOf(pattern, pos + 1)) != -1) {
                result = true;
            }

            return result;
        });
    }
});

function mailBoxController() {
    this.searchPattern = 'F';
    this.letters = [{
        title: 'First letter',
        recievedDate: new Date() - 5
    }, {
        title: 'Second letter',
        recievedDate: new Date() - 28 * 1000
    }, {
        title: 'Third letter',
        recievedDate: new Date() - 4 * 60 * 1000
    }, {
        title: 'Fourth letter',
        recievedDate: new Date() - 3 * 60 * 60 * 1000
    }, {
        title: 'Fifth letter',
        recievedDate: new Date() - 5 * 24 * 60 * 60 * 1000
    }];

    this.remove = function (letter) {
        let index = this.letters.findIndex(function (l) {
            return letter === l;
        });

        if (~index) {
            this.letters.splice(index, 1);
            onRemove(letter);
        }
    };

    function onRemove (letter) {
        let currentDate = new Date();
        let liveTime = currentDate - letter.recievedDate;

        console.log(liveTime);
    }
}
