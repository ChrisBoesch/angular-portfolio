(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []).

    directive('smupfSvgContainer', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope){

          $scope.container = {
            'display': 'inline-block',
            'position': 'relative',
            'width': '100%',
            'padding-bottom': '100%',
            'vertical-align': 'middle',
            'overflow': 'hidden'
          };

          this.setRatio = function(ratio) {
            console.log(ratio);
            $scope.container['padding-bottom'] = (ratio * 100) + '%';
          };

        },
        template: '<div ng-transclude ng-style="container"></div>',
        link: function(scope, element) {
          element.find('svg').css({
            'display': 'inline-block',
            'position': 'absolute',
            'top': '0',
            'left': '0'
          });
        }
      };
    }).


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
        require: '?^smupfSvgContainer',
        scope: {
          'viewBox': '=?smupfViewbox'
        },
        link: function(scope, element, attrs, containerCtrl) {

          element.get(0).setAttribute('preserveAspectRatio', 'xMinYMin meet');

          scope.$watch('viewBox', function(){
            var vb = scope.viewBox;

            element.get(0).setAttribute(
              'viewBox',
              [-vb.margin.left, -vb.margin.top, vb.width, vb.height].join(' ')
            );

            if (containerCtrl && containerCtrl.setRatio) {
              containerCtrl.setRatio(vb.height / vb.width);
            }

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
