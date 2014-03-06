angular.module('templates-main', ['partials/smuPortFolio/charts/bars.html', 'partials/smuPortFolio/evaluation.html', 'partials/smuPortFolio/exam.html', 'partials/smuPortFolio/home.html', 'partials/smuPortFolio/portfolio.html']);

angular.module("partials/smuPortFolio/charts/bars.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/charts/bars.html",
    "<h4>{{data.name}}</h4>\n" +
    "<svg smupf-viewbox=\"layout\">\n" +
    "\n" +
    "  <g class=\"rulers\">\n" +
    "    <line ng-repeat=\"v in yAxisScale.ticks(10)\" \n" +
    "      ng-if=\"!$first\"\n" +
    "      ng-attr-transform=\"translate(0,{{yAxisScale(v)}})\" \n" +
    "      ng-attr-x2=\"{{layout.innerWidth}}\"\n" +
    "    />\n" +
    "  </g>\n" +
    "\n" +
    "  <g class=\"chart\">\n" +
    "    <g class=\"serie\" ng-repeat=\"serie in data.data\" ng-attr-transform=\"translate({{xScale(serie.name)}},0)\">\n" +
    "      <rect ng-repeat=\"field in xSubScale.domain()\"\n" +
    "        ng-class=\"field|dash\"\n" +
    "        ng-attr-x=\"{{xSubScale(field)}}\"\n" +
    "        ng-attr-y=\"{{layout.innerHeight-yScale(serie[field])}}\"\n" +
    "        ng-attr-width=\"{{xSubScale.rangeBand()}}\"\n" +
    "        ng-attr-height=\"{{yScale(serie[field])}}\"\n" +
    "      />\n" +
    "    </g>\n" +
    "  </g>\n" +
    "  \n" +
    "  <g class=\"axis x-axis\" ng-attr-transform=\"translate(0, {{layout.innerHeight}})\">\n" +
    "    <line ng-attr-x2=\"{{layout.innerWidth}}\"/>\n" +
    "    <g class=\"tick\" ng-repeat=\"name in xScale.domain()\" ng-attr-transform=\"translate({{xScale(name)}},0)\">\n" +
    "      <line y2=\"7\" ng-attr-transform=\"translate({{xScale.rangeBand()}},0)\"/>\n" +
    "      <text ng-attr-x=\"{{xScale.rangeBand()/2}}\" dy=\"10\">{{name}}</text>\n" +
    "    </g>\n" +
    "  </g>\n" +
    "\n" +
    "  <g class=\"legend\"\n" +
    "    ng-repeat=\"name in legendScale.domain()\"\n" +
    "    ng-attr-transform=\"translate({{legendScale(name)}},{{layout.height}})\"\n" +
    "  >\n" +
    "    <rect ng-class=\"name|dash\" y=\"-2em\" width=\"1em\" height=\"1em\"/>\n" +
    "    <text y=\"-1.5em\" x=\"2em\">{{name}}</text>\n" +
    "  </g>\n" +
    "\n" +
    "  <g class=\"axis y-axis\">\n" +
    "    <line ng-attr-y2=\"{{layout.innerHeight}}\"/>\n" +
    "    <g class=\"tick\" ng-repeat=\"v in yAxisScale.ticks(10)\" ng-attr-transform=\"translate(0,{{yAxisScale(v)}})\">\n" +
    "      <line x2=\"-7\"/>\n" +
    "      <text dx=\"-12\">{{v|percent}}</text>\n" +
    "    </g>\n" +
    "  </g>\n" +
    "\n" +
    "</svg>");
}]);

angular.module("partials/smuPortFolio/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/evaluation.html",
    "<div class=\"col-md-12 evaluation\">\n" +
    "  <div class=\"row \">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"i in [0,1,2]\">\n" +
    "      <smupf-bars smupf-data=\"evaluation.data[i]\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"i in [3,4,5]\">\n" +
    "      <smupf-bars smupf-data=\"evaluation.data[i]\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/exam.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/exam.html",
    "<div class=\"col-md-8\">\n" +
    "  <svg smupf-viewbox=\"layout\">\n" +
    "\n" +
    "    <g class=\"chart\">\n" +
    "      <rect class=\"border\" ng-attr-width=\"{{layout.innerWidth}}\" ng-attr-height=\"{{layout.innerHeight}}\"/>\n" +
    "      <line class=\"mean\" ng-attr-transform=\"translate({{layout.innerWidth/2}},0)\" ng-attr-y2=\"{{layout.innerHeight}}\"/>\n" +
    "\n" +
    "      <g class=\"results\" ng-repeat=\"(_, r) in exam.results\" ng-attr-transform=\"translate(0,{{yScale(r.topic.name)}})\">\n" +
    "        <text ng-attr-transform=\"translate({{-layout.margin.left+10}},0)\">\n" +
    "          {{r.topic.name}}\n" +
    "        </text>\n" +
    "        <line ng-attr-x1=\"{{xScale(r.data.min)}}\" ng-attr-x2=\"{{xScale(r.data.max)}}\"/>\n" +
    "        <line class=\"min\" ng-attr-transform=\"translate({{xScale(r.data.min)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "        <line class=\"max\" ng-attr-transform=\"translate({{xScale(r.data.max)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "        <rect ng-attr-transform=\"translate({{xScale(r.data.mean)-4}},-4)\" width=\"8\" height=\"8\"/>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"axis x-axis\" ng-attr-transform=\"translate(0,{{layout.innerHeight}})\">\n" +
    "      <line ng-attr-x2=\"{{layout.innerWidth}}\"/>\n" +
    "      <g class=\"tick\" ng-repeat=\"t in ticks\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "        <line y2=\"5\"/>\n" +
    "      </g>\n" +
    "      <g class=\"main-tick\" ng-repeat=\"t in [-2, -1, 0, 1, 2]\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "        <line y1=\"5\" y2=\"8\"/>\n" +
    "        <text dy=\"12\">{{t}}</text>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "  </svg>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4\">\n" +
    "  <h3>Interpretation</h3>\n" +
    "  <p>\n" +
    "    This graph provides information about your performance relative to the\n" +
    "    performance of all other students on each topic.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The green line represents the mean percentage of questions that all students\n" +
    "    have answered correctly on this topic, over time (not necessarily the same\n" +
    "    questions that you have answered on each topic).\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The red box is your mean score, and the hatch marks represent the standard\n" +
    "    deviation of your scores.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    By comparing the red boxes, you can determine the disciplines and organ\n" +
    "    systems in which your performance is relatively weak or strong.\n" +
    "  </p>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<div class=\"col-md-12\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"student in students\">\n" +
    "      <a ng-href=\"#/portfolio/{{student.id}}\">{{student.firstName}} {{student.lastName}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/portfolio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/portfolio.html",
    "<div class=\"col-md-8\">\n" +
    "  <div class=\"row\">\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"!student.exams\">You have not taken part to any exam.</p>\n" +
    "\n" +
    "      <div ng-repeat=\"(_, serie) in student.examSeries\">\n" +
    "\n" +
    "        <h3 ng-bind=\"serie.name\">Exam type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"(_, exam) in serie.exams\">\n" +
    "            <a ng-href=\"#/portfolio/{{student.id}}/exam/{{exam.id}}\" ng-bind=\"exam.name\">No exam</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"!student.evaluations\">You have not taken part to any evaluation.</p>\n" +
    "\n" +
    "      <div ng-repeat=\"(groupName, evaluations) in student.evaluations\">\n" +
    "\n" +
    "        <h3 ng-bind=\"groupName\">Evaluation type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"evaluation in evaluations\">\n" +
    "            <a ng-href=\"#/portfolio/{{student.id}}/evaluation/{{evaluation.id}}\" ng-bind=\"evaluation.name\">No evaluation</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4 side-bar\">\n" +
    "\n" +
    "  <img ng-src=\"{{student.photo}}\" alt=\"student portrait\" class=\"img-thumbnail\"/>\n" +
    "  <h3>\n" +
    "    <span ng-bind=\"student.firstName\">Student first name</span>\n" +
    "    <span ng-bind=\"student.lastName\">Student last name</span>\n" +
    "    <small ng-bind=\"student.matricule\">student matricule</small>\n" +
    "  </h3>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
