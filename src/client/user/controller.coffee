angular.module('cvalid').controller "user", ($scope, storage)->
	$scope.step = 0

	$scope.card = ""
	$scope.pin = ""
	$scope.name = ""
	$scope.email=""

	$scope.next = ()->
		$scope.step++;
