var app = angular.module('todoApp', []);

app.controller('TodoController', function($scope) {
    // Load tasks from localStorage on startup
    const savedTasks = localStorage.getItem('tasks');
    $scope.tasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Add a new task
    $scope.addTask = function() {
        if (!$scope.newTaskText) return;
        $scope.tasks.push({
            text: $scope.newTaskText,
            done: false
        });
        $scope.newTaskText = '';
        $scope.saveTasks();
    };

    // Delete a task
    $scope.deleteTask = function(index) {
        $scope.tasks.splice(index, 1);
        $scope.saveTasks();
    };

    // Save tasks to localStorage
    $scope.saveTasks = function() {
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };

    // Close the app using the Electron bridge
    $scope.closeApp = function() {
        window.electronAPI.closeApp();
    };
});