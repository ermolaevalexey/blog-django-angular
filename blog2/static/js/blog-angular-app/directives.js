/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';
(function (exports) {
    exports.blogDirectives = angular.module('blogDirectives', [])

    .directive('userBar', function () {
       return {
           restrict: 'E',
           templateUrl: '/static/js/blog-angular-app/templates/user-bar.html',
           controller: blogControllers.CurrentUserController
       }
    })

    .directive('editDeletePost', function () {
       return {
           restrict: 'E',
           templateUrl: 'static/js/blog-angular-app/templates/edit-delete-post.html',
           controller: blogControllers.PostListCtrl
       }
    })

    .directive('postContent', function () {
       return {
           restrict: 'E',
           templateUrl: 'static/js/blog-angular-app/templates/post-content.html',
           controller: blogControllers.PostListCtrl
       }
    });
})(this);