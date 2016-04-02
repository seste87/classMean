'use strict';

var angular = require('angular');

angular.module('todoListApp')
.directive('todos', function() {
  return {
      templateUrl: 'templates/todos.html',
      controller: 'mainCtrl'
  }
});
