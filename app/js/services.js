(function(){
  'use strict';

  var interceptor = function(data, operation, what) {
    var newResponse;
    if (operation === "getList") {
      newResponse = data[what];
      newResponse.cursor = data.cursor;
    } else {
      newResponse = data;
    }
    return newResponse;
  };

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE);
        RestangularConfigurer.addResponseInterceptor(interceptor);
      });
    }]).

    factory('smuPFPortfolioApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE + '/portfolio');
        RestangularConfigurer.addResponseInterceptor(interceptor);
      });
    }]).

    factory('smuPFSvgLayout', [function() {
      return function(margin, width, height) {
        margin = margin || {top: 10, right: 10, bottom:10, left: 10};
        width = width || 600;
        height = height || 450;

        return {
          margin: margin,
          width: width,
          height: height,
          innerWidth: width - margin.right - margin.left,
          innerHeight: height - margin.top - margin.bottom
        };

      };
    }])

  ;

})();
