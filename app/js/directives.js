(function(){
  'use strict';

  angular.module('smuPortFolio.directives', ['scceSvg.directives']).

    directive('smupfBars', ['SMU_PL_TPL_PATH', 'smuPFSvgLayout', '$window', function(path, layout, window) {
          return {
            restrict: 'E',
            'templateUrl': path + '/charts/bars.html',
            scope: {
              'data': '=smupfData',
              'width': '&smupfWidth',
              'height': '&smupfHeight'
            },
            link: function(scope) {
              var onDataChange, d3 = window.d3;

              scope.layout = layout(
                {top: 10, right: 10, bottom:70, left: 60},
                scope.width(),
                scope.height()
              );

              onDataChange = function() {
                if (!scope.data) {
                  return;
                }

                scope.xScale = d3.scale.ordinal();
                scope.xSubScale = d3.scale.ordinal();
                scope.yScale = d3.scale.linear();

                // set domains
                scope.data.data.forEach(function(type){
                  scope.xScale(type.name);
                });
                scope.xSubScale = scope.xSubScale.domain(['value', 'mean']);
                scope.yScale = scope.yScale.domain([0, 1]);

                // set ranges
                scope.xScale = scope.xScale.rangeBands([0, scope.layout.innerWidth], 0, 0);
                scope.xSubScale = scope.xSubScale.rangeBands(
                  [0, scope.layout.innerWidth/scope.xScale.domain().length], 0, 1)
                ;
                scope.legendScale = scope.xSubScale.copy().rangeBands([0, scope.layout.innerWidth], 0.1, 1);
                scope.yScale = scope.yScale.range([0, scope.layout.innerHeight]).nice();
                scope.yAxisScale = scope.yScale.copy().range([scope.layout.innerHeight, 0]).nice();

                // Translate legend name
                scope.translate = function(fieldName) {
                  var t = {'value': 'You', 'mean': 'All others'};
                  return t[fieldName] ? t[fieldName] : fieldName;
                };
              };

              scope.$watch('data', onDataChange);
            }
          };
        }])

  ;

})();
