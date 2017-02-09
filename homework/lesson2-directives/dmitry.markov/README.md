# Домашняя работа #2 Дмитрий Марков

### Задание

##### Приложение "Статический компонент mailBox"
1. Сделать статический компонент mailBox
2. Внутри компонента mailBox вывести список писем
3. Для каждого письма выводить время получения (например: 2 часа назад, 3 дня назад)(custom filter)
4. Сделать фильтрацию писем(custom filter) по полю поиска
5. При удалении элемента(onDestroy) со страницы выводить в консоль сколько "жило письмо" (время создания письма - время когда удалено со страницы)

### Demo
http://plnkr.co/edit/aK1w6SSsBLX1LbJuBxDq?p=preview

### TODO:
- [x] create component mailBox
- [x] view mail list
- [x] delete item
- [x] delete item onDestroy cl(toast) ttl (created minus deleted time)
- [x] show received time via custom filter
- [x] custom filter - search input
- [x] random message time (sort of)
- [x] index always 0, incorrect deletion
- [x] toaster console log
- [ ] pluralize data output
