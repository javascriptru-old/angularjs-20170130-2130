angular.module('app', [])
    .component('app', {
        templateUrl: 'tpls/app.html',
        controller: function() {
            this.mails = [{
                "title": "Aliquam erat volutpat.",
                "user": "Christine George",
                "email": "cgeorge0@gov.uk",
                "receiveDate": "2017-02-09T19:03:10Z"
            }, {
                "title": "Ut at dolor quis odio consequat varius.",
                "user": "Harry Fernandez",
                "email": "hfernandez1@google.es",
                "receiveDate": "2016-06-30T14:25:05Z"
            }, {
                "title": "Integer tincidunt ante vel ipsum.",
                "user": "Jacqueline Armstrong",
                "email": "jarmstrong2@tripadvisor.com",
                "receiveDate": "2016-09-24T05:10:26Z"
            }, {
                "title": "Praesent lectus.",
                "user": "Virginia Kim",
                "email": "vkim3@goo.ne.jp",
                "receiveDate": "2016-07-02T03:16:54Z"
            }, {
                "title": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
                "user": "Jeremy Medina",
                "email": "jmedina4@exblog.jp",
                "receiveDate": "2016-07-06T05:09:55Z"
            }, {
                "title": "Integer ac neque.",
                "user": "Adam Jacobs",
                "email": "ajacobs5@1und1.de",
                "receiveDate": "2016-07-03T01:47:58Z"
            }, {
                "title": "Nulla nisl.",
                "user": "Ruth Andrews",
                "email": "randrews6@time.com",
                "receiveDate": "2016-10-12T15:37:22Z"
            }, {
                "title": "Integer ac neque.",
                "user": "Bonnie Grant",
                "email": "bgrant7@histats.com",
                "receiveDate": "2016-03-25T02:40:32Z"
            }, {
                "title": "Integer tincidunt ante vel ipsum.",
                "user": "Bruce Flores",
                "email": "bflores8@cnn.com",
                "receiveDate": "2016-05-04T13:29:20Z"
            }, {
                "title": "Nam dui.",
                "user": "Ralph Arnold",
                "email": "rarnold9@xrea.com",
                "receiveDate": "2016-04-19T19:12:21Z"
            }, {
                "title": "Pellentesque at nulla.",
                "user": "Rose Elliott",
                "email": "relliotta@purevolume.com",
                "receiveDate": "2016-09-04T20:01:43Z"
            }, {
                "title": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
                "user": "Bobby Thomas",
                "email": "bthomasb@xing.com",
                "receiveDate": "2016-04-29T10:23:57Z"
            }, {
                "title": "Praesent blandit.",
                "user": "Eric Ramos",
                "email": "eramosc@springer.com",
                "receiveDate": "2017-01-05T01:22:16Z"
            }, {
                "title": "In blandit ultrices enim.",
                "user": "Virginia Ward",
                "email": "vwardd@google.com.br",
                "receiveDate": "2016-08-03T07:59:07Z"
            }, {
                "title": "Phasellus in felis.",
                "user": "Aaron Anderson",
                "email": "aandersone@wufoo.com",
                "receiveDate": "2016-09-02T17:52:22Z"
            }, {
                "title": "Donec ut mauris eget massa tempor convallis.",
                "user": "Joe Butler",
                "email": "jbutlerf@jalbum.net",
                "receiveDate": "2016-05-07T14:40:52Z"
            }, {
                "title": "Ut tellus.",
                "user": "Laura Watson",
                "email": "lwatsong@wisc.edu",
                "receiveDate": "2016-02-26T18:23:21Z"
            }, {
                "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
                "user": "Jack Hughes",
                "email": "jhughesh@ow.ly",
                "receiveDate": "2016-09-16T11:05:25Z"
            }, {
                "title": "Duis bibendum.",
                "user": "Mark Rivera",
                "email": "mriverai@com.com",
                "receiveDate": "2016-02-28T00:29:58Z"
            }, {
                "title": "Phasellus id sapien in sapien iaculis congue.",
                "user": "Diana Hawkins",
                "email": "dhawkinsj@ebay.com",
                "receiveDate": "2016-05-13T12:32:58Z"
            }];

            this.remove = (item) => {
              let i = this.mails.indexOf(item);
              if(i != -1) this.mails.splice(i, 1)
            }
        },
        controllerAs: 'ctrl'
    })
    .component('mailBox', {
        templateUrl: 'tpls/mail-box.html',
        bindings: {
            mails: '<',
            remove: '&'
        },
        controller: function() {
            angular.extend(this, {
                token: ''
            });
        },
        controllerAs: 'ctrl'
    })
    .component('mailList', {
        templateUrl: 'tpls/mail-list.html',
        bindings: {
            list: '<',
            token: '<',
            remove: '&'
        },
        controllerAs: 'ctrl'
    })
    .filter('filter', function() {
        return function(items, token) {
            if (!token) return items;
            let pattern = new RegExp(token, 'g');
            return items.filter((item) => item.title.search(pattern) != -1);
        }
    })
    .filter('fromNow', function() {
      return (date) => moment(date).startOf('minute').fromNow();
    });
