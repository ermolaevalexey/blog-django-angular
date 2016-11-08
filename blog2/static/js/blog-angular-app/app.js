/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

(function (exports) {
    exports.blogApp = angular.module('BlogApp', ['ngRoute', 'ui.bootstrap.datetimepicker', 'blogControllers', 'blogDirectives', 'blogFilters'])

    .config(['$routeProvider',
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
            when('/add-post/', {
                templateUrl: '/static/js/blog-angular-app/templates/add-post.html',
                controller: 'AddPostController'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);
})(this);