(function(){
  'use strict';

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE);
        RestangularConfigurer.setRequestSuffix('.json');
      });
    }])
  
  ;
  
})();
