angular.module('templates-main', ['partials/smuPortFolio/home.html']);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<h1>Students</h1>\n" +
    "<ul>\n" +
    "  <li ng-repeat=\"student in students\">\n" +
    "    <a href=\"#\">{{student.fullName}}</a>\n" +
    "  </li>\n" +
    "</ul>");
}]);
