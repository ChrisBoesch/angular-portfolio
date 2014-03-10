(function(){
  'use strict';

  var interceptor = function(data, operation, what) {
    var resp;

    if (operation === "getList") {
      resp = data[what] ? data[what] : [];
      resp.cursor = data.cursor ? data.cursor : null;
    } else {
      resp = data;
    }
    return resp;
  };

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFUser', ['SMU_PL_API_BASE', '$http', '$location', function(SMU_PL_API_BASE, $http, $location) {
      return function() {

        return $http.get(SMU_PL_API_BASE + '/user?returnUrl=' + btoa($location.absUrl())).then(
          function(resp) {
            resp.data.isLoggedIn = true;
            return resp.data;
          },
          function(resp) {
            resp.data.isLoggedIn = false;
            return resp.data;
          }
        );
      };
    }]).

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
