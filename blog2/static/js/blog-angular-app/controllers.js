/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';
(function (exports) {
    /* Controllers */
    exports.blogControllers = angular.module('blogControllers', [])

    .controller('CurrentUserController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.currentUser;
            $http.get('/api/v1/auth/user/?format=json').then(function (data) {
                $scope.currentUser = data.data.objects[0];
            });
        }
    ])

    .controller('AddPostController', ['$scope', '$http', '$controller',
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
                    "author": currentUserCtrlViewModel.currentUser.resource_uri,
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
                    $scope.title = document.getElementsByName('postTitle').value;
                    $scope.text = document.getElementsByName('postText').value;
                    window.location.href = '/';
                }).error(function (error) {
                    console.log(error);
                });
            }
        }
    ])

    .controller('PostListCtrl', ['$scope', '$http', '$controller',
        function ($scope, $http, $controller) {
            $scope.posts = null;
            var currentScope = $scope;
            $controller('CurrentUserController', { $scope: $scope});
            $scope.renderPostList = function () {
                $http.get('api/v1/post/?format=json').then(function (data) {
                    $scope.posts = data.data.objects;
                });
            };

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
                if (confirm('Вы действительно хотите это сделать?')) {
                    $http({
                        headers: {
                          'Content-Type': 'application/json; charset=UTF-8'
                        },
                        url: $scope.deletingPost.resource_uri,
                        method: 'DELETE'
                    }).success(function () {
                        console.log('Deleted');
                        currentScope.renderPostList();
                    }).error(function (error) {
                       console.log(error);
                    });
                }
            };

            $scope.renderPostList();
        }
    ])

    .controller('PostDetailCtrl', ['$scope', '$routeParams', '$http',
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

})(this);

