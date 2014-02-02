angular.module('templates-main', ['partials/smuPortFolio/home.html']);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "{{greeting}}");
}]);
