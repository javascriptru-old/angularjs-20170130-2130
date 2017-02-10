import angular from 'angular'
import rootApp from './src/rootApp'
import userCards from './src/userCards'

var app = angular.module('app', []);
app.component('userCards', userCards)
app.component('rootApp', rootApp)
