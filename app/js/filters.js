(function(){
  'use strict';

  angular.module('smuPortFolio.filters', []).

    filter('percent',  ['$window', function(window){
      var d3 = window.d3,
        formatter = d3.format(".00%");

      return function(v) {
        return formatter(v);
      };
    }]).


    filter('dash', function(){
      return function(v) {
        return v.replace(' ', '-');
      };
    });

  
})();
