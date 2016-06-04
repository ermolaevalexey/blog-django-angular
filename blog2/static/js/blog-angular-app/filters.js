/**
 * Created by aleksejermolaev on 04.06.16.
 */
'use strict';

var blogFilters = angular.module('blogFilters', []);

blogFilters.filter('limitText', function () {
   return function (str, len) {
       if(str.length > len) {
           str = str.substr(0, len);
           str += '...';
       }
       return str;
   }
});