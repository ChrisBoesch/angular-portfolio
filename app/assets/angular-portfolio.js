(function(){
  'use strict';

  angular.module('smuPortFolio.config', []).
    
    constant('SMU_PL_TPL_PATH', 'partials/smuPortFolio').
    constant('SMU_PL_API_BASE', '/api/v1')

    ;
  
})();
;angular.module('templates-main', ['partials/smuPortFolio/home.html']);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<h1>Students</h1>\n" +
    "<ul>\n" +
    "  <li ng-repeat=\"student in students\">\n" +
    "    <a href=\"#\">{{student.fullName}}</a>\n" +
    "  </li>\n" +
    "</ul>");
}]);
;(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []);
  
})();
;(function(){
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
;(function(){
  'use strict';

  angular.module('smuPortFolio.filters', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.controllers', ['smuPortFolio.services']).
    
    /**
     * Should set:
     * 
     * - set a list of student
     * 
     */
    controller('SmuPFHomeCtrl', ['$scope', 'smuPFApi', function($scope, smuPFApi) {
      $scope.students = smuPFApi.all('students').getList().$object;
    }])

    ;
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio', [
    'ngRoute',
    'smuPortFolio.config',
    'smuPortFolio.filters',
    'smuPortFolio.services',
    'smuPortFolio.directives',
    'smuPortFolio.controllers',
    'templates-main',
    'ui.bootstrap',
    'restangular'
  ]).

  config(['$routeProvider', 'SMU_PL_TPL_PATH', function($routeProvider, SMU_PL_TPL_PATH) {
    $routeProvider.when('/', {templateUrl: SMU_PL_TPL_PATH + '/home.html', controller: 'SmuPFHomeCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  
})();
