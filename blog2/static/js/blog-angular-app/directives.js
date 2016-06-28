/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

var blogDirectives = angular.module('blogDirectives', []);

blogDirectives.directive('userBar', function () {
   return {
       restrict: 'E',
       templateUrl: '/static/js/blog-angular-app/templates/user-bar.html',
       controller: blogControllers.CurrentUserController
   }
});

blogDirectives.directive('editDeletePost', function () {
   return {
       restrict: 'E',
       templateUrl: 'static/js/blog-angular-app/templates/edit-delete-post.html',
       controller: blogControllers.PostListCtrl
   }
});