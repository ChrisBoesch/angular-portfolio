(function(){
  'use strict';

  angular.module('smuPortFolio.config', []).
    
    constant('SMU_PL_TPL_PATH', 'partials/smuPortFolio')

    ;
  
})();
;angular.module('templates-main', ['partials/smuPortFolio/home.html']);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "{{greeting}}");
}]);
;(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.services', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.filters', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.controllers', []).
    
    controller('SmuPFHomeCtrl', ['$scope', function($scope) {
      $scope.greeting = 'Hello world!';
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
    'ui.bootstrap'
  ]).

  config(['$routeProvider', 'SMU_PL_TPL_PATH', function($routeProvider, SMU_PL_TPL_PATH) {
    $routeProvider.when('/', {templateUrl: SMU_PL_TPL_PATH + '/home.html', controller: 'SmuPFHomeCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  
})();
