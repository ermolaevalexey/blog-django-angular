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
            console.log($scope.posts);
        });
    }
]);

blogControllers.controller('PostDetailCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $scope.postDetail = null;
        $http.get('api/v1/post/' + $routeParams.postId + '/?format=json').then(function (data) {
            $scope.postDetail = data.data;
            console.log($scope.postDetail);
        });
    }
]);