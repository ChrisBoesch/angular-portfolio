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
    })

  ;
  
})();
