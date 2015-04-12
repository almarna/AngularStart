// Code "borrowed" from github https://github.com/tastejs/todomvc/blob/019057d088f7cdf7688c9d479fd16d32dad9e982/architecture-examples/angularjs/js/controllers/todoCtrl.js
// I keep it as an example how I like angularJs NOT to be implemented.
// How maintainable is the code? Where are the separation of Concerns? Is the code easy to understand?

angular.module('todomvc') // Configuration.IoC
    .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage) // Pages.SampleController
    {
        var todos = $scope.todos = todoStorage.get();

        $scope.newTodo = '';
        $scope.editedTodo = null;

        // Watch variable
        $scope.$watch('todos', function(newValue, oldValue)
        {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
            if (newValue !== oldValue)
            { 
                todoStorage.put(todos);
            }
        }, true);

        // Listen to event
        $scope.$on('$routeChangeSuccess', function()
        {
            var status = $scope.status = $routeParams.status || '';


            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        // Methods "inserted" into $scope"
        $scope.addTodo = function()
        {
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length)
            {
                return;
            }


            todos.push({
                title: newTodo,
                completed: false
            });


            $scope.newTodo = '';
        };


        $scope.editTodo = function(todo)
        {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand. 
            $scope.originalTodo = angular.extend({}, todo);
        };


        $scope.doneEditing = function(todo)
        {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();


            if (!todo.title)
            {
                $scope.removeTodo(todo);
            }
        };


        $scope.revertEditing = function(todo)
        {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.doneEditing($scope.originalTodo);
        };


        $scope.removeTodo = function(todo)
        {
            todos.splice(todos.indexOf(todo), 1);
        };


        $scope.clearCompletedTodos = function()
        {
            $scope.todos = todos = todos.filter(function(val)
            {
                return !val.completed;
            });
        };


        $scope.markAll = function(completed)
        {
            todos.forEach(function(todo)
            {
                todo.completed = !completed;
            });
        };
    }); // End of controller AND end of module
