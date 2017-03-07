1. Файл: app.js
Функция: deleteMail
Строки: 16-23

Можно ли удалить объект без его поиска путем запуска цикла ? Есть более элегантное решение?

this.deleteMail = (item) => {
    for (var i = 0; i < this.mails.length; i++) {
        if (this.mails[i] == item) {
            this.mails.splice(i, 1);
            break;
        }
    }
}


 this.mails.splice( this.mails.indexOf(item), 1);