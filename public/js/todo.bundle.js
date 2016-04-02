webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("todoListApp", []);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);



	/*
	Note: I don't think this answer was covered in the class
	Review: get, delete, and save data with services
	In JavaScript promises are a way to manage data requested asynchronously.
	true or false question has an extra "manage data" answer option
	*/

	/*
	Using Filters to order ng-repeat items:
	You forgot to include the svg files for the checkboxes
	in the workspaces folders. I would add links in the teachers
	notes, or add them to the project in workspaces
	*/

	/*
	At the end of each section in the course, the badge modal window
	is missing the continue link, so you have to press the back
	button to get to the next section of the course.
	*/


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.controller('mainCtrl', function($scope, $log, $interval, dataService) {

	  $scope.seconds = 0;

	  $scope.counter = function() {
	    $scope.seconds++;
	    $log.log($scope.seconds + ' have passed!');
	    $log.warn($scope.seconds + ' have passed!');
	    $log.error($scope.seconds + ' have passed!');
	  };

	  $interval($scope.counter, 1000, 10);

	  $scope.addTodo = function() {
	    var todo = {"name": "This is a new todo."};
	    $scope.todos.unshift(todo);
	  };

	  dataService.getTodos(function(response) {
	    console.log(response.data);
	    $scope.todos = response.data.todos;
	  });

	  $scope.deleteTodo = function(todo, $index) {
	    dataService.deleteTodo(todo);
	    $scope.todos.splice($index, 1);
	  };

	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo) {
	      if(todo.edited) {
	        return todo;
	      }
	    });
	    dataService.saveTodos(filteredTodos)
	               .finally($scope.resetTodoState());
	  };

	  $scope.resetTodoState = function() {
	    $scope.todos.forEach(function(todo) {
	      todo.edited = false;
	    });
	  };

	})


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.directive('todos', function() {
	  return {
	      templateUrl: 'templates/todos.html',
	      controller: 'mainCtrl'
	  }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.service('dataService', function($http, $q) {

	  this.helloConsole = function() {
	    console.log("This is the hello console service!");
	  };

	  this.getTodos = function(callback) {
	    $http.get('/api/todos')
	    .then(callback);
	  };

	  this.deleteTodo = function(todo) {
	    console.log("The " + todo.name + " todo has been deleted!");
	    // other communication logic
	  };

	  this.saveTodos = function(todos) {
	    var queue = [];
	    todos.forEach(function(todo) {
	      var request;
	      if(!todo._id) {
	        request = $http.post('/api/todos', todo);
	      } else {
	        request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
	          todo = result.data.todo;
	          return todo;
	        });
	      };
	      queue.push(request);
	    });
	    return $q.all(queue).then(function(results){
	      console.log("I saved " + todos.length + " todos!");
	    });

	    // other communication logic
	  }

	});


/***/ }
]);