var app = angular.module('myApp', []);

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


app.controller('DashBoardController', function($scope, $http) {
    $http.get('/api/values').success(function(data) {
        $scope.items = data;
    });
});

app.controller('ItemController', function($scope, socket) {
    socket.on('change', function (data) {
        if($scope.item.name == data.name){
            $scope.item = data;
        }
    });    
});