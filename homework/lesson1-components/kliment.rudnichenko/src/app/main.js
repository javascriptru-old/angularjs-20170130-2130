import angular from 'angular';
import appRoot from './app-root';
import userCard from './user-card/user-card';

const app = angular
    .module('myApp', []);

app.component('appRoot', appRoot);
app.component('userCard', userCard);

export default app;