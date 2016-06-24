/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

/* Controllers */ 
var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('PostListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.posts = null;
        $http.get('api/v1/post/?format=json').then(function (data) {
            $scope.posts = data.data.objects;
        });
    }
]);

blogControllers.controller('PostDetailCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.postDetail = null;
        $http.get('api/v1/post/' + $routeParams.postId + '/?format=json').then(function (data) {
            $scope.postDetail = data.data;
        });
    }
]);

//blogControllers.controller('UserController', ['$scope', '$http',
//    function ($scope, $http) {
//        $scope.userList = null;
//        $http.get('/api/v1/auth/user/?format=json').then(function (data) {
//            $scope.userList = data.data.objects;
//        });
//    }
//]);

blogControllers.controller('CurrentUserController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.currentUser = null;
        $http.get('/api/v1/auth/user/?format=json').then(function (data) {
            $scope.currentUser = data.data.objects;
            console.log($scope.currentUser);
        });
    }
]);

blogControllers.controller('AddPostController', ['$scope', '$http', '$controller',
    function ($scope, $http, $controller) {
        var currentUserCtrlViewModel = $scope.$new();
        $controller('CurrentUserController', { $scope: currentUserCtrlViewModel});
        $scope.title = document.getElementsByName('postTitle').value;
        $scope.text = document.getElementsByName('postText').value;
        console.log($scope);
        //$scope.created_date = new Date().now();
        //$scope.published_date = $scope.created_date;
        $scope.addPost = function () {
            var data = {
                "author": currentUserCtrlViewModel.currentUser[0].resource_uri,
                //"created_date": $scope.created_date,
                //"published_date": $scope.published_date,
                "text": $scope.text,
                "title": $scope.title
            };

            $http({
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                url: '/api/v1/post/',
                method: 'POST',
                data: data
            }).success(function (data, status, headers, config) {
                console.log(data, status, headers, config);
            }).error(function (error) {
                console.log(error);
            });
        }
    }
]);