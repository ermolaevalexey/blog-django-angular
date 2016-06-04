/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

var blogApp = angular.module('BlogApp', ['ngRoute', 'blogControllers']);

blogApp.config(['$routeProvider', 
    function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/static/js/blog-angular-app/templates/posts.html',
            controller: 'PostListCtrl'
        }).
        when('/posts/:postId', {
            templateUrl: '/static/js/blog-angular-app/templates/post-detail.html',
            controller: 'PostDetailCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);