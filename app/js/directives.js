(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []).

    /**
     * Directive to set the a `svga element `viewBox` attribute
     * from values from the scope.
     *
     * With:
     *
     *  <svg ng-attr-viewBox="0 0 {{100}} {{100}}"/>
     *
     * Angular would produce the correct attribute but it would have no effect.
     * This directive edit the viewBox.baseVal property directly.
     *
     * Usage:
     *
     *  <svg smu-pf-view-box="layout"/>
     *
     * where `$scope.layout == {width: 100, height: 100, margin:{top:10, left:20}}`
     *
     * TODO: should create package that scoreboard and portfolio can share.
     *
     */
    directive('smupfViewbox', function(){
      return {
        scope: {
          'viewBox': '=?smupfViewbox'
        },
        link: function(scope, element) {

          console.dir(element);
          element.get(0).setAttribute('preserveAspectRatio', 'xMinYMin meet');

          scope.$watch('viewBox', function(){
            var vb = scope.viewBox;

            element.get(0).setAttribute(
              'viewBox',
              [-vb.margin.left, -vb.margin.top, vb.width, vb.height].join(' ')
            );

          });
        }
      };
    }).

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
                scope.xSubScale = scope.xSubScale.domain(['You', 'All others']);
                scope.yScale = scope.yScale.domain([0, 1]);

                // set ranges
                scope.xScale = scope.xScale.rangeBands([0, scope.layout.innerWidth], 0, 0);
                scope.xSubScale = scope.xSubScale.rangeBands(
                  [0, scope.layout.innerWidth/scope.xScale.domain().length], 0, 1)
                ;
                scope.legendScale = scope.xSubScale.copy().rangeBands([0, scope.layout.innerWidth], 0.1, 1);
                scope.yScale = scope.yScale.range([0, scope.layout.innerHeight]).nice();
                scope.yAxisScale = scope.yScale.copy().range([scope.layout.innerHeight, 0]).nice();
              };

              scope.$watch('data', onDataChange);
            }
          };
        }])

  ;

})();
