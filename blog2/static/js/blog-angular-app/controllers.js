/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

/* Controllers */ 
var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('CurrentUserController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.currentUser = null;
        $http.get('/api/v1/auth/user/?format=json').then(function (data) {
            $scope.currentUser = data.data.objects;
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

blogControllers.controller('PostListCtrl', ['$scope', '$http',
    function ($scope, $http, $controller) {
        $scope.posts = null;
        $scope.currentUser = $scope.$parent.currentUser;

        $http.get('api/v1/post/?format=json').then(function (data) {
            $scope.posts = data.data.objects;
            $scope.currentUser = $scope.$parent.currentUser;
        });

        $scope.toggleEditMode = function (post, isEditing) {
            post.isEditing = isEditing;
        };

        $scope.editPost = function (post) {
            $scope.editingPost = post;
            $scope.editingPost.isEditing = true;
            $scope.editingPost.author = post.author;
            $scope.editingPost.title = post.title;
            $scope.editingPost.text = post.text;
            console.log($scope.editingPost);
            var data = {
                'author': $scope.editingPost.author,
                'text': $scope.editingPost.text,
                'title': $scope.editingPost.title
            };
            $http({
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                url: $scope.editingPost.resource_uri,
                method: 'PUT',
                data: data
            }).success(function (data, status) {
                console.log(data, status);

            }).error(function (error) {
                console.log(error);
            });
        };

        $scope.deletePost = function (post) {
            $scope.deletingPost = post;
            $scope.deletingPost.isDeleting = true;
            console.log($scope.deletingPost);
        };
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
