'use strict';

/**
 * @ngdoc function
 * @name composeUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the composeUiApp
 */
angular.module('composeUiApp')
  .controller('MainCtrl', function ($scope, $resource, pageSize) {

    var Projects = $resource('api/v1/projects');

    $scope.isActive = function (id, l) {
      var name = id.toLowerCase().replace(/\-/g, '');
      return l.indexOf(name) >= 0;
    };

    function reload(displayMessage) {
      Projects.get(function (data) {
        $scope.projects = data;
        if (displayMessage) {
          alertify.success(Object.keys(data.projects).length + ' projects reloaded');
        }
      });
    }

    $scope.reload = reload;

    $scope.isEmpty = function (obj) {
      return angular.equals({}, obj);
    };

    $scope.page = 0;
    $scope.pageSize = pageSize;

    $scope.size = function (projects) {
      return projects ? Object.keys(projects).length : 0;
    };


    reload(false);

  });
