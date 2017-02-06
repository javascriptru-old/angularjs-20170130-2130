# Домашняя работа #1 Дмитрий Марков

### Задание

##### Приложение "Список пользоватей"
1. Сделать статический компонент userCard (карточка пользователя)
2. Организовать передачу данных внутрь компонета userCard
3. Вывести список карточек пользователя (ng-repeat) (используя данные из users.json)
4. При клике(ng-click) на элемент списка подсвечивать его синими
5. Реализовать возможность удаления элементов из списка (& bindings)

### Demo
http://plnkr.co/edit/HeLL6YaAH8CXu0rWVuss?p=preview

### TODO:
- [x] service
- [x] onclick - blue
- [x] onclick - delete &callback
- [x] default image
- [x] country info
- [x] http json service
- [x] random change backgrounds
- [x] remove blue selection from other cards
- [ ] break into files
- [ ] delete animation
- [ ] country flags

### Вопросы преподавателю
* есть ли более простой способ передать данные http-запроса в контроллер?
* можно ли было реализовать функционал сервиса usersService через фабрику?
* как лучше прокинуть событие в соседние дочерние элементы (снятие активного класса)?